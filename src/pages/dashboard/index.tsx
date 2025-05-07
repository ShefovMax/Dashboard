import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';

import { useThemeMode } from '@app/providers/ThemeProvider';

const Dashboard = () => {
  const { toggleTheme, mode } = useThemeMode();

  return (
    <div>
      Dashboard
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  );
};

export default Dashboard;
