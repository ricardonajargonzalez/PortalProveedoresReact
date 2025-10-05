import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {


  const [carrito, setCarrito] = useState(() => {
    // Inicializar carrito desde localStorage
    const savedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    return savedCart;
  });

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const totalProductos = carrito.reduce((acc, producto) => acc + (producto.cantidad || 0), 0);

  return (
    <CartContext.Provider value={{ carrito, actualizarCarrito, totalProductos }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
