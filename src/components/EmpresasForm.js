// src/components/EmpresaForm.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { crearEmpresa } from '../services/empresasService'; // Importa el servicio
import i18next from 'i18next';

const EmpresaForm = () => {
  const [codempresa, setCodempresa] = useState('');
  const [empresaNombre, setEmpresaNombre] = useState('');
  const [id, setId] = useState('');
  const [cotizacionInicial, setCotizacionInicial] = useState('');
  const [cantidadAcciones, setCantidadAcciones] = useState('');
  const [idioma, setIdioma] = useState(i18next.language); // Estado para el idioma

  // Configurar idioma inicial y manejar cambios
  useEffect(() => {
    const idiomaGuardado = localStorage.getItem('idioma') || 'es';
    i18next.changeLanguage(idiomaGuardado);
    setIdioma(idiomaGuardado);

    const handleLanguageChange = (nuevoIdioma) => {
      setIdioma(nuevoIdioma);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Función para agregar una nueva empresa
  const agregarEmpresa = async () => {
    const nuevaEmpresa = {
      codempresa,
      empresaNombre,
      id: parseInt(id, 10), // Convertir a número
      cotizacionInicial: parseFloat(cotizacionInicial), // Convertir a número
      cantidadAcciones: parseInt(cantidadAcciones, 10), // Convertir a número
    };

    try {
      await crearEmpresa(nuevaEmpresa);
      console.log(nuevaEmpresa);
      // Limpiar los campos después de agregar
      setCodempresa('');
      setEmpresaNombre('');
      setId('');
      setCotizacionInicial('');
      setCantidadAcciones('');
    } catch (error) {
      console.error("Error al agregar la empresa:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {i18next.t('agregarEmpresa')}
      </Typography>
      <TextField
        label={i18next.t('codigoEmpresa')}
        variant="outlined"
        value={codempresa}
        onChange={(e) => setCodempresa(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={i18next.t('nombreEmpresa')}
        variant="outlined"
        value={empresaNombre}
        onChange={(e) => setEmpresaNombre(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ID"
        type="number"
        variant="outlined"
        value={id}
        onChange={(e) => setId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={i18next.t('cotizacionInicial')}
        type="number"
        variant="outlined"
        value={cotizacionInicial}
        onChange={(e) => setCotizacionInicial(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label={i18next.t('cantidadAcciones')}
        type="number"
        variant="outlined"
        value={cantidadAcciones}
        onChange={(e) => setCantidadAcciones(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={agregarEmpresa}
        style={{ marginTop: '16px' }}
      >
        {i18next.t('botonAgregar')}
      </Button>
    </Container>
  );
};

export default EmpresaForm;
