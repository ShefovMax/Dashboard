import BrushIcon from '@mui/icons-material/Brush';
import PaletteIcon from '@mui/icons-material/Palette';
import AutoFixOffIcon from '@mui/icons-material/AutoFixOff';
import React from 'react';

import type { Tool } from './types';

const tools = [
  { id: 'pen' as Tool, label: 'Paint', icon: <BrushIcon /> },
  { id: 'eraser' as Tool, label: 'Eraser', icon: <AutoFixOffIcon /> },
  { id: 'image' as Tool, label: 'Image', icon: <PaletteIcon /> }
];

export default tools;
