import React, { useRef } from 'react';

import Canvas from '@entities/canvas/ui/Canvas';
import Toolbar from '@entities/toolbar/ui/Index';

import styles from './dashboard.module.css';

const Dashboard = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container} ref={dashboardRef}>
      <Canvas containerRef={dashboardRef} />
      <Toolbar />
    </div>
  );
};

export default Dashboard;
