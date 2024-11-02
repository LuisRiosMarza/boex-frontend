// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div style={{ width: 240, position: 'fixed', top: 64, left: 0, height: '100%', backgroundColor: '#f4f4f4' }}>
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
        <ListItem button component={Link} to="/">
          <ListItemText primary="Agregar cotizacion" />
        </ListItem>
        {/* Agrega más empresas según sea necesario */}
      </List>
    </div >
  );
};

export default Sidebar;
