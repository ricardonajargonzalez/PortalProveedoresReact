import { useMemo } from "react";

const useTotalesCarrito = (carrito) => {
  const totales = useMemo(() => {
    return carrito.reduce(
      (totales, producto) => {
        totales.totalCantidad += producto.cantidad;
        totales.totalPrecio += producto.cantidad * producto.precio;
        return totales;
      },
      { totalCantidad: 0, totalPrecio: 0 } // Valores iniciales
    );
  }, [carrito]); // Se recalcula cuando cambia el carrito

  return totales; // Devuelve el objeto con totalCantidad y totalPrecio
};

export default useTotalesCarrito;
