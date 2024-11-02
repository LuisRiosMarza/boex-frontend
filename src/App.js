// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CotizacionForm from './components/CotizacionForm';
import CotizacionEmpresa from './components/CotizacionEmpresa'; // Asegúrate de crear este componente

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: 240, padding: 20 }}> {/* Espacio para el contenido */}
          <Routes>
            <Route path="/" element={<CotizacionForm />} />
            <Route path="/empresa1" element={<CotizacionEmpresa empresa="empresa1" />} />
            <Route path="/empresa2" element={<CotizacionEmpresa empresa="empresa2" />} />
            <Route path="/empresa3" element={<CotizacionEmpresa empresa="empresa3" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
