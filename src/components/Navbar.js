// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Select, MenuItem, FormControl, InputLabel, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  // Idioma por defecto si no hay nada guardado
  const idiomaPorDefecto = 'es';

  // Estado para manejar el idioma actual
  const [idioma, setIdioma] = useState(idiomaPorDefecto);

  // Estado para manejar la apertura del menú en mobile
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    // Cargar el idioma desde localStorage
    const idiomaGuardado = localStorage.getItem('idioma');
    if (idiomaGuardado) {
      setIdioma(idiomaGuardado);
      i18next.changeLanguage(idiomaGuardado);
    } else {
      setIdioma(idiomaPorDefecto);
      i18next.changeLanguage(idiomaPorDefecto);
      localStorage.setItem('idioma', idiomaPorDefecto);
    }
  }, []);

  const manejarSeleccionDeIdioma = (event) => {
    const nuevoIdioma = event.target.value;
    setIdioma(nuevoIdioma); // Cambiar idioma en el estado
    i18next.changeLanguage(nuevoIdioma); // Cambiar idioma en i18next
    localStorage.setItem('idioma', nuevoIdioma); // Guardar el idioma en localStorage
  };

  // Hook para manejar el tamaño de la pantalla (si es mobile)
  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'black', padding: 2 }}>
      <Toolbar>
        {/* Contenedor de la imagen y el título */}
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          {/* Imagen antes del título */}
          <img
            src="/logoMOEX.png" // Reemplaza con la ruta correcta
            alt="Logo Rusia"
            style={{ height: '50px', marginRight: '10px' }}
          />
          <Typography variant="h6" sx={{ color: 'white' }}>
            MOSCOW EXCHANGE
          </Typography>
        </Box>

        {/* Si es mobile, mostrar el ícono de hamburguesa */}
        {esMobile ? (
          <IconButton color="inherit" onClick={() => setMenuAbierto(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            {/* Botones de navegación en pantalla grande */}
            <Button color="inherit" component={Link} to="/">
              {i18next.t('inicio')}
            </Button>
            <Button color="inherit" component={Link} to="/empresas">
              {i18next.t('empresas')}
            </Button>
            <Button color="inherit" component={Link} to="/participaciones">
              {i18next.t('participaciones')}
            </Button>
            <Button color="inherit" component={Link} to="/indices">
              {i18next.t('indices')}
            </Button>
          </>
        )}

        {/* Selector de idioma */}
        <FormControl sx={{ minWidth: 120, marginLeft: '20px' }}>
          <InputLabel id="idioma-select-label" sx={{ color: 'white' }}>
            Idioma
          </InputLabel>
          <Select
            labelId="idioma-select-label"
            value={idioma}
            label="Idioma"
            onChange={manejarSeleccionDeIdioma}
            sx={{
              color: 'white',
              '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '.MuiSvgIcon-root': { color: 'white' },
            }}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>

      {/* Menú desplegable (hamburguesa) */}
      <Drawer
        anchor="left"
        open={menuAbierto}
        onClose={() => setMenuAbierto(false)}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={() => setMenuAbierto(false)}>
            <ListItemText primary={i18next.t('inicio')} />
          </ListItem>
          <ListItem button component={Link} to="/empresas" onClick={() => setMenuAbierto(false)}>
            <ListItemText primary={i18next.t('empresas')} />
          </ListItem>
          <ListItem button component={Link} to="/participaciones" onClick={() => setMenuAbierto(false)}>
            <ListItemText primary={i18next.t('participaciones')} />
          </ListItem>
          <ListItem button component={Link} to="/indices" onClick={() => setMenuAbierto(false)}>
            <ListItemText primary={i18next.t('indices')} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
