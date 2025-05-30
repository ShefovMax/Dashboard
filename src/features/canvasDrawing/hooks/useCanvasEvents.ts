import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addElement, updateElement } from '@entities/canvas/model/slice';
import { CanvasElement, CanvasPoint } from '@entities/canvas/model/types';
import { socket } from '@shared/socket';

// Подписываемся на мышиные события и вызываем диспатчи
export function useCanvasEvents(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  elements: CanvasElement[],
  params: { color: string; lineWidth: number; tool: string }
) {
  const { color, lineWidth, tool } = params;

  const dispatch = useDispatch();
  const isDrawing = useRef(false);
  const points = useRef<CanvasPoint[]>([]);
  const draggingId = useRef<string | null>(null);
  const dragOffset = useRef<CanvasPoint | null>(null);

  // Получаем все ранее нарисованные элементы с сервера
  useEffect(() => {
    const handleInit = (initialElements: CanvasElement[]) => {
      initialElements.forEach((el) => dispatch(addElement(el)));
    };

    socket.on('init', handleInit);

    return () => {
      socket.off('init', handleInit);
    };
  }, [dispatch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const getMousePos = (e: MouseEvent) => ({ x: e.offsetX, y: e.offsetY });

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = getMousePos(e);

      // Проверяем перетаскивание изображения
      // eslint-disable-next-line no-plusplus
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el.type === 'image') {
          const ex = el.x ?? 0;
          const ey = el.y ?? 0;
          const ew = el.width ?? 300;
          const eh = el.height ?? 300;

          if (x >= ex && x <= ex + ew && y >= ey && y <= ey + eh) {
            draggingId.current = el.id;
            dragOffset.current = { x: x - ex, y: y - ey };
            return;
          }
        }
      }

      // Рисование линии
      isDrawing.current = true;
      points.current = [{ x, y }];
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.strokeStyle = tool === 'eraser' ? '#fff' : color;

      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getMousePos(e);

      // Если перетаскиваем
      if (draggingId.current) {
        const offset = dragOffset.current;
        if (offset) {
          dispatch(
            updateElement({
              id: draggingId.current,
              changes: { x: x - offset.x, y: y - offset.y }
            })
          );
        }
        return;
      }

      // Если рисуем линию
      if (isDrawing.current) {
        points.current.push({ x, y });
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const handleMouseUpOrLeave = () => {
      if (draggingId.current) {
        draggingId.current = null;
        return;
      }

      if (!isDrawing.current) return;

      isDrawing.current = false;
      ctx.stroke();

      if (points.current.length) {
        // const canvas = canvasRef.current;
        if (!canvas) return;

        const normalizedElement: CanvasElement = {
          id: crypto.randomUUID(),
          type: 'line',
          points: points.current.map((p) => ({
            x: p.x / canvas.width,
            y: p.y / canvas.height
          })),
          lineWidth,
          color: tool === 'eraser' ? '#fff' : color,
          canvasWidth: canvas.width,
          canvasHeight: canvas.height
        };

        dispatch(addElement(normalizedElement));
        socket.emit('draw', normalizedElement);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUpOrLeave);
    canvas.addEventListener('mouseleave', handleMouseUpOrLeave);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUpOrLeave);
      canvas.removeEventListener('mouseleave', handleMouseUpOrLeave);
    };
  }, [canvasRef, elements, dispatch, color, lineWidth, tool]);

  useEffect(() => {
    const handleRemoteDraw = (data: CanvasElement) => {
      dispatch(addElement(data));
    };

    // Подписываемся на draw
    socket.on('draw', handleRemoteDraw);

    // Чистим подписку при размонтировании
    return () => {
      socket.off('draw', handleRemoteDraw);
    };
  }, [dispatch]);
}
