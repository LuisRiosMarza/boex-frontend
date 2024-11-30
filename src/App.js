// src/App.js
import React from 'react';
import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CotizacionForm from './components/EmpresasForm';
import CotizacionEmpresa from './components/CotizacionEmpresa';
import Navbar from './components/Navbar';
import EmpresasTarjetas from './components/EmpresasTarjetas';
import IndicesTarjetas from './components/IndicesTarjetas';
import Participaciones from './components/Participaciones';
import CotizacionIndice from './components/CotizacionIndices';
import Inicio from './components/Inicio';
import { useTheme, useMediaQuery } from '@mui/material';

const App = () => {
  // Hook para manejar el tamaño de la pantalla (si es mobile)
  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down('xl'));

  // Definir marginLeft según el tamaño de la pantalla
  let marginLeft = 240; // Valor por defecto
  if (esMobile) {
    marginLeft = 0; // Si es mobile, no se aplica marginLeft
  }

  return (
    <Router>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div
          style={{
            marginLeft: marginLeft, // Aplicar el marginLeft definido
            marginTop: 96,
            padding: 20,
            flexGrow: 1
          }}
        >
          <Routes>
            <Route path="/" element={<Inicio />} /> {/* Ruta principal */}
            <Route path="/agregarEmpresa" element={<CotizacionForm />} /> {/* Ruta principal */}
            <Route path="/empresas" element={<EmpresasTarjetas />} /> {/* Nueva ruta para empresas */}
            <Route path="/:empresa" element={<CotizacionEmpresa />} /> {/* Ruta dinámica para empresas */}
            <Route path="/indices" element={<IndicesTarjetas />} /> {/* Ruta dinámica para bolsas */}
            <Route path="/participaciones" element={<Participaciones />} /> {/* Ruta dinámica para bolsas */}
            <Route path="/indicesCotizaciones/:code" element={<CotizacionIndice />} /> {/* Ruta dinámica para empresas */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
