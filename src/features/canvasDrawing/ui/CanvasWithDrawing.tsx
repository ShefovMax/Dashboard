import React, { useRef, useEffect, useCallback } from 'react';

import { Canvas } from '@entities/canvas/ui/Canvas';

import { useCanvasDrawing } from '../hooks/useCanvasDrawing';
import { fitCanvasToContainer } from '../lib/fitCanvasToContainer';

interface Props {
  containerRef?: React.RefObject<HTMLDivElement>;
}

export const CanvasWithDrawing: React.FC<Props> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { renderElements } = useCanvasDrawing(canvasRef);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef?.current;

    if (canvas && container) {
      fitCanvasToContainer(canvas, container);
      renderElements();
    }
  }, [containerRef, renderElements]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  return <Canvas canvasRef={canvasRef} />;
};
