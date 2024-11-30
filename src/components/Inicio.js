// src/components/Inicio.js
import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { Carousel as MUICarousel } from 'react-responsive-carousel';
import { useTranslation } from 'react-i18next';  // Importa i18next para cambiar el idioma

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Asegúrate de importar el estilo

const Inicio = () => {
  const { t } = useTranslation();  // Hook para la traducción
  
  return (
    <Container style={{ marginTop: '40px' }}>

      {/* Descripción de Bienvenida */}
      <Typography variant="h3" gutterBottom style={{ textAlign: 'center', marginTop: '30px' }}>
        {t('bienvenido')}
      </Typography>
      <Typography variant="h6" paragraph style={{ textAlign: 'center' }}>
        {t('descripcionBienvenida')}
      </Typography>

      {/* Carrusel de Imágenes */}
      <Box>
        <MUICarousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          interval={5000}
        >
          <div>
            <img src="/moex1.jpg" alt="Imagen 1" />
          </div>
          <div>
            <img src="/moex2.jpg" alt="Imagen 2" />
          </div>
          <div>
            <img src="/moex3.png" alt="Imagen 3" />
          </div>
        </MUICarousel>
      </Box>

      {/* Información adicional */}
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '30px' }}>
        <Grid item xs={12} md={4}>
          <Box textAlign="center" padding={2} boxShadow={3} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              {t('informacionTiempoReal')}
            </Typography>
            <Typography variant="body2">
              {t('descripcionInformacionTiempoReal')}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box textAlign="center" padding={2} boxShadow={3} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              {t('estadisticasMercado')}
            </Typography>
            <Typography variant="body2">
              {t('descripcionEstadisticasMercado')}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box textAlign="center" padding={2} boxShadow={3} borderRadius={2}>
            <Typography variant="h6" gutterBottom>
              {t('analisisFinanciero')}
            </Typography>
            <Typography variant="body2">
              {t('descripcionAnalisisFinanciero')}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Botón de llamada a la acción */}
      <Box textAlign="center" marginTop={4}>
        <Button variant="contained" color="primary" href="/empresas" size="large">
          {t('verEmpresas')}
        </Button>
      </Box>
    </Container>
  );
};

export default Inicio;
