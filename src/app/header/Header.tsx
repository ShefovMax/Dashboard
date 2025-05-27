import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Brightness7 from '@mui/icons-material/Brightness7';
import Brightness4 from '@mui/icons-material/Brightness4';

import NavButton from '@shared/nav-button';

import { useThemeMode } from '../providers/ThemeProvider';

import styles from './Header.module.css';

const Navbar: React.FC = () => {
  const { toggleTheme, mode } = useThemeMode();

  return (
    <nav className={styles.nav}>
      <ButtonGroup variant="outlined">
        <NavButton href="/">Dashboard</NavButton>
        <NavButton href="profile">Profile</NavButton>
        <NavButton href="other">Other</NavButton>
      </ButtonGroup>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </nav>
  );
};

export default Navbar;
