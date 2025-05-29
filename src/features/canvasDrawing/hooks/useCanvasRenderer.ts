import { useCallback } from 'react';

import { CanvasElement } from '@entities/canvas/model/types';

import { useImageCache } from './useImageCache';
import { useCanvasContext } from './useCanvasContext';

// Отрисовываем все элементы на канвасе
export function useCanvasRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  elements: CanvasElement[]
) {
  const getContext = useCanvasContext(canvasRef);
  const { getImage, loadImage } = useImageCache();

  return useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach((el) => {
      if (el.type === 'image' && el.src) {
        const img = getImage(el.id);
        if (img) {
          ctx.drawImage(img, el.x ?? 0, el.y ?? 0, el.width ?? 300, el.height ?? 300);
        } else {
          loadImage(el.id, el.src, () => {
            // После загрузки — перерисовка
            const ctx2 = getContext();
            const cachedImg = getImage(el.id);
            if (ctx2 && cachedImg) {
              ctx2.drawImage(cachedImg, el.x ?? 0, el.y ?? 0, el.width ?? 300, el.height ?? 300);
            }
          });
        }
      }

      if (el.type === 'line' && el.points?.length) {
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
    });
  }, [canvasRef, elements, getContext, getImage, loadImage]);
}
