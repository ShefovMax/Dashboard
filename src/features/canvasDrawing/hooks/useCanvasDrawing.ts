import { RefObject, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@app/store';

import { useCanvasRenderer } from './useCanvasRenderer';
import { useCanvasEvents } from './useCanvasEvents';

export function useCanvasDrawing(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const elements = useSelector((state: RootState) => state.canvas.elements);
  const tool = useSelector((state: RootState) => state.toolbar.tool);
  const lineWidth = useSelector((state: RootState) => state.toolbar.lineWidth);
  const color = useSelector((state: RootState) => state.toolbar.color);

  const renderElements = useCanvasRenderer(canvasRef, elements);

  useEffect(() => {
    renderElements();
  }, [renderElements]);

  useCanvasEvents(canvasRef, elements, { color, lineWidth, tool });

  return { renderElements };
}
