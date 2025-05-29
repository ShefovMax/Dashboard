import { useCallback } from 'react';

// Получаем контекст 2d
export function useCanvasContext(canvasRef: React.RefObject<HTMLCanvasElement>) {
  return useCallback(() => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext('2d') : null;
  }, [canvasRef]);
}
