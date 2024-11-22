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

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: 240, marginTop: 64, padding: 20, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<CotizacionForm />} /> {/* Ruta principal */}
            <Route path="/empresas" element={<EmpresasTarjetas />} /> {/* Nueva ruta para empresas */}
            <Route path="/:empresa" element={<CotizacionEmpresa />} /> {/* Ruta dinámica para empresas */}
            <Route path="/indices" element={<IndicesTarjetas />} /> {/* Ruta dinámica para bolsas */}
            <Route path="/participaciones" element={<Participaciones />} /> {/* Ruta dinámica para bolsas */}
            <Route path="/indicesCotizaciones/:codigoIndice" element={<CotizacionIndice />} /> {/* Ruta dinámica para empresas */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
