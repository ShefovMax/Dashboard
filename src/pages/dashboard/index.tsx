import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness7 from '@mui/icons-material/Brightness7';
import Brightness4 from '@mui/icons-material/Brightness4';

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
