// BOEX-frontend/src/components/Cotizaciones.js
import React, { useEffect, useState } from 'react';
import { obtenerCotizaciones, crearCotizacion, eliminarCotizacion } from '../services/cotizacionesService';

const Cotizaciones = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaEmpresa, setNuevaEmpresa] = useState('');

  const cargarCotizaciones = async () => {
    const data = await obtenerCotizaciones();
    setCotizaciones(data);
  };

  useEffect(() => {
    cargarCotizaciones();
  }, []);

  const agregarCotizacion = async () => {
    const nuevaCotizacion = { empresa: nuevaEmpresa, precio: nuevoPrecio, hora: new Date().toLocaleTimeString() };
    console.log(nuevaCotizacion);
    await crearCotizacion(nuevaCotizacion);
    setNuevaEmpresa('');
    setNuevoPrecio('');
    cargarCotizaciones();
  };

  const eliminar = async (id) => {
    await eliminarCotizacion(id);
    cargarCotizaciones();
  };

  return (
    <div>
      <h1>Cotizaciones</h1>
      <input
        type="text"
        placeholder="Nombre de la Empresa"
        value={nuevaEmpresa}
        onChange={(e) => setNuevaEmpresa(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={nuevoPrecio}
        onChange={(e) => setNuevoPrecio(e.target.value)}
      />
      <button onClick={agregarCotizacion}>Agregar Cotización</button>
      <ul>
        {cotizaciones.map(cotizacion => (
          <li key={cotizacion._id}>
            {cotizacion.empresa} - ${cotizacion.precio} 
            <button onClick={() => eliminar(cotizacion._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cotizaciones;
