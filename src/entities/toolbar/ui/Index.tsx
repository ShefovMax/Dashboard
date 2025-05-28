import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';

import tools from '../model/data';

import styles from './Toolbar.module.css';

const Toolbar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.toolbar}>
      <List className={styles.list} component="div" aria-label="toolbar">
        {tools.map((tool) => {
          return (
            <ListItemButton
              selected={selectedIndex === tool.id}
              onClick={(event) => handleListItemClick(event, tool.id)}>
              <ListItemIcon>{tool.icon}</ListItemIcon>
              <ListItemText primary={tool.label} />
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
};

export default Toolbar;
