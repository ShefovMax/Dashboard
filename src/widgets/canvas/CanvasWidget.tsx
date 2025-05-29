import React, { useRef } from 'react';

import { CanvasWithDrawing } from '@features/canvasDrawing/ui/CanvasWithDrawing';

import styles from './canvasWidget.module.css';

export const CanvasWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={styles.canvasContainer}>
      <CanvasWithDrawing containerRef={containerRef} />
    </div>
  );
};
