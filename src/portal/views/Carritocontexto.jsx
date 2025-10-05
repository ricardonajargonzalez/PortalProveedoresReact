import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CarritoContext = createContext();

// Crear un proveedor para el contexto
export const CarritoProvider = ({ children }) => {
  const [vista, setVista] = useState(false); // true para 4 items, false para 8 items

  const toggleVista = () => {
    setVista((prevVista) => !prevVista);
  };

  return (
    <CarritoContext.Provider value={{ vista, toggleVista }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useCarrito = () => {
  return useContext(CarritoContext);
};
