import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/store';

import { addElement } from '../model/slice';

export function useCanvasDrawing(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const isDrawing = useRef(false);
  const dispatch = useDispatch();
  const points = useRef<{ x: number; y: number }[]>([]);

  const elements = useSelector((state: RootState) => state.canvas.elements);

  const tool = useSelector((state: RootState) => state.toolbar.tool);
  const lineWidth = useSelector((state: RootState) => state.toolbar.lineWidth);
  const color = useSelector((state: RootState) => state.toolbar.color);

  const renderElements = useCallback(() => {
    console.log(elements);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((el) => {
      switch (el.type) {
        case 'image':
          if (!el.src) return;
          // eslint-disable-next-line no-case-declarations
          const img = new Image();
          img.src = el.src;
          img.onload = () => {
            ctx.drawImage(img, el.x ?? 0, el.y ?? 0, el.width ?? 100, el.height ?? 100);
          };
          break;
        case 'line': {
          if (el.points && el.points.length > 0) {
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.strokeStyle = el.color ?? '#000';
            ctx.lineWidth = el.lineWidth ?? 1;

            const start = el.points[0];
            ctx.moveTo(start.x * canvas.width, start.y * canvas.height);

            el.points.slice(1).forEach((point) => {
              ctx.lineTo(point.x * canvas.width, point.y * canvas.height);
            });

            ctx.stroke();
          }
          break;
        }
        default:
          break;
      }

      // if (el.type === 'line' && el.points && el.points.length > 0) {
      //   ctx.beginPath();
      //   ctx.lineCap = 'round';
      //   ctx.strokeStyle = el.color ?? '#000';
      //   ctx.lineWidth = el.lineWidth ?? 1;

      //   const start = el.points[0];
      //   ctx.moveTo(start.x * canvas.width, start.y * canvas.height);

      //   el.points.slice(1).forEach((point) => {
      //     ctx.lineTo(point.x * canvas.width, point.y * canvas.height);
      //   });

      //   ctx.stroke();
      // }
    });
  }, [canvasRef, elements]);

  useEffect(() => {
    renderElements();
  }, [elements, renderElements]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const startDraw = (e: MouseEvent) => {
      isDrawing.current = true;
      points.current = [{ x: e.offsetX, y: e.offsetY }];
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';

      if (tool === 'eraser') {
        ctx.strokeStyle = '#fff';
      } else {
        ctx.strokeStyle = color;
      }

      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing.current) return;
      points.current.push({ x: e.offsetX, y: e.offsetY });
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    const stopDraw = () => {
      if (!isDrawing.current) return;
      isDrawing.current = false;
      ctx.stroke();

      if (points.current.length > 0) {
        dispatch(
          addElement({
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
          })
        );
      }
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDraw);
      canvas.removeEventListener('mouseleave', stopDraw);
    };
  }, [canvasRef, dispatch, lineWidth, color, tool]);

  return { renderElements };
}
