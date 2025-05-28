import React, { useRef, useEffect, useCallback } from 'react';

import { fitCanvasToContainer } from '../lib/fitCanvasToContainer';
import { useCanvasDrawing } from '../lib/useCanvasDrawing';

import styles from './canvas.module.css';

interface CanvasProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

const Canvas: React.FC<CanvasProps> = ({ containerRef }) => {
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
  }, [resizeCanvas, renderElements]);

  // useCanvasDrawing(canvasRef);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default Canvas;
