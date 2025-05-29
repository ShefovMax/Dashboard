import React, { useCallback, useRef } from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/store';

import { changeLineWidth, changeTool, changeColor } from '../model/slice';
import tools from '../model/data';
import type { Tool } from '../model/types';
import imageUpload from '../lib/imageUpload';

import styles from './Toolbar.module.css';

const Toolbar = () => {
  const dispatch = useDispatch();
  const selectedTool = useSelector((state: RootState) => state.toolbar.tool);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    imageUpload(event, 100, 100, dispatch);
  };

  const handleToolSelect = useCallback(
    (tool: Tool) => {
      if (tool === 'image') {
        // При выборе Image — программно клик по input
        fileInputRef.current?.click();
      }
      dispatch(changeTool(tool));
    },
    [dispatch]
  );

  const handleLineWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(0, Math.min(40, Number(e.target.value)));
      dispatch(changeLineWidth(value));
    },
    [dispatch]
  );

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeColor(e.target.value));
    },
    [dispatch]
  );

  const blockInvalidKeys = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['-', '+'].includes(e.key)) {
      e.preventDefault();
    }
  }, []);

  return (
    <div className={styles.toolbar} aria-label="toolbar">
      <List className={styles.list} component="div">
        {tools.map((tool) => (
          <ListItemButton
            key={tool.id}
            selected={selectedTool === tool.id}
            onClick={() => handleToolSelect(tool.id)}>
            <ListItemIcon>{tool.icon}</ListItemIcon>
            <ListItemText primary={tool.label} />
          </ListItemButton>
        ))}
        {/* Скрытый инпут */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
      </List>

      <List className={styles.list} component="div">
        <Input
          type="number"
          className={styles.widthInput}
          placeholder="толщина"
          inputProps={{ min: 0, 'aria-label': 'Line width' }}
          onChange={handleLineWidthChange}
          onKeyDown={blockInvalidKeys}
        />
        <Input
          type="color"
          className={styles.colorInput}
          placeholder="цвет"
          inputProps={{ 'aria-label': 'Color' }}
          onChange={handleColorChange}
        />
      </List>
    </div>
  );
};

export default Toolbar;
