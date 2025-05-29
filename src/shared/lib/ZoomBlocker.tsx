import { useEffect } from 'react';

export const ZoomBlocker = () => {
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
      }
    };

    const wheelHandler = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', keyHandler);
    window.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      window.removeEventListener('keydown', keyHandler);
      window.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return null;
};
