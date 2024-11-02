// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
         BOEX RUSSIAN 
        </Typography>
        <Button color="inherit">Inicio</Button>
        <Button color="inherit">Empresas</Button>
        <Button color="inherit">Cotizaciones</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
