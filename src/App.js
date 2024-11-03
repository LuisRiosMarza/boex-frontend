// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CotizacionForm from './components/CotizacionForm';
import CotizacionEmpresa from './components/CotizacionEmpresa';
import Navbar from './components/Navbar';
import Empresas from './components/Empresas';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: 240, marginTop: 64, padding: 20, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<CotizacionForm />} /> {/* Ruta principal */}
            <Route path="/empresas" element={<Empresas />} /> {/* Nueva ruta para empresas */}
            <Route path="/:empresa" element={<CotizacionEmpresa />} /> {/* Ruta dinámica para empresas */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
