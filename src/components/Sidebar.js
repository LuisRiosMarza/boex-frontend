// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem button component={Link} to="/empresa1">
          <ListItemText primary="Empresa 1" />
        </ListItem>
        <ListItem button component={Link} to="/empresa2">
          <ListItemText primary="Empresa 2" />
        </ListItem>
        <ListItem button component={Link} to="/empresa3">
          <ListItemText primary="Empresa 3" />
        </ListItem>
        {/* Agrega más empresas según sea necesario */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
