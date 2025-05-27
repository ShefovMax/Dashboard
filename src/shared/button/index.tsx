import React from 'react';
import { Button as MuiButton } from '@mui/material';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
};

const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, variant = 'contained', size = 'medium' } = props;

  return (
    <MuiButton onClick={onClick} variant={variant} size={size}>
      {children}
    </MuiButton>
  );
};

export default Button;
