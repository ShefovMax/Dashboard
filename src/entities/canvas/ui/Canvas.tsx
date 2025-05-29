import React from 'react';

import styles from './canvas.module.css';

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const Canvas: React.FC<CanvasProps> = ({ canvasRef }) => {
  return <canvas ref={canvasRef} className={styles.canvas} />;
};
