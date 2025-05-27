import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { Link } from 'react-router-dom';

type NavButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
};

const NavButton: React.FC<NavButtonProps> = (props) => {
  const { children, href, variant = 'contained', size = 'medium' } = props;

  return (
    <MuiButton variant={variant} size={size}>
      <Link to={href}>{children}</Link>
    </MuiButton>
  );
};

export default NavButton;
