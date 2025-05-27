import React from 'react';
import cn from 'classnames';

import styles from './DefaultLayoyt.module.css';

type LayoutProps = {
  type?: 'wide' | 'default';
  children: React.ReactNode;
};

const defaultLayout: React.FC<LayoutProps> = (props) => {
  const { type = 'default', children } = props;

  return <div className={cn(styles.wrapper, { [styles.wide]: type === 'wide' })}>{children}</div>;
};

export default defaultLayout;
