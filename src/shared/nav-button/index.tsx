import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './navButton.module.css';

type NavButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
};

const NavButton: React.FC<NavButtonProps> = (props) => {
  const { children, href, variant = 'contained', size = 'medium' } = props;

  return (
    <MuiButton className={styles.button} variant={variant} size={size}>
      <Link style={{ textDecoration: 'none' }} to={href}>
        {children}
      </Link>
    </MuiButton>
  );
};

export default NavButton;
