import BrushIcon from '@mui/icons-material/Brush';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import React from 'react';

const tools = [
  { id: 1, label: 'Paint', icon: <BrushIcon /> },
  { id: 2, label: 'Customize', icon: <PaletteIcon /> },
  { id: 3, label: 'Eraser', icon: <AutoFixOffIcon /> }
];

export default tools;
