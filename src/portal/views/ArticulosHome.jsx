import { useEffect, useMemo, useRef, useState } from "react";


import { backEndApi } from "../../api/BackEndApi";
import './CatalogPage.css';
import { Box, Button, CircularProgress, Grid, MenuItem, Pagination, Paper, TextField, Typography } from "@mui/material";
import { useCart } from "./Cartcontext";
import { useCarrito } from "./Carritocontexto";
import useTotalesCarrito from "../../hooks/useTotalesCarrito";
import { useSelector } from "react-redux";
// import Pagination from "../../ui/components/Pagination";








export const ArticulosHome = () => {

  const [page, setPage] = useState(1);
  const [categoria, setCategoria] = useState("PAPELERIA");
  const [productoTexto, setProductoTexto] = useState("");
  const [productos, setProductos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  // Estados para cantidades y totales de los productos
  const [cantidades, setCantidades] = useState({});
  const { carrito, actualizarCarrito } = useCart();
  const { vista } = useCarrito(); // Usamos el valor de vista del contexto
  const { totalCantidad, totalPrecio } = useTotalesCarrito(carrito);
  const [enviarCarrito, setenviarCarrito] = useState(false);
  const {  rfc, proveedorId } = useSelector(state => state.auth);

  const loadPage = async (page, categoria, productoTexto) => {
    setLoading(true);
    try {
      const response = await backEndApi.get(
        "https://dexdelnoroeste.com/ApiClienteLeoni/v1/filtroProductos",
        {
          params: { page, categoria, productoTexto },
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      setProductos(response.data.results || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      setProductos([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(page, categoria, productoTexto);
  }, [page, categoria, productoTexto]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const aumentarCantidad = (producto) => {
    const nuevoCarrito = carrito.some((item) => item.id === producto.id)
      ? carrito.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
      : [...carrito, { ...producto, cantidad: 1 }];

    actualizarCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((item) =>
        item.id === id && item.cantidad > 0
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);

    actualizarCarrito(nuevoCarrito);
  };

  useEffect(() => {
    guardarEnCarrito();
  }, [cantidades]);

  const guardarEnCarrito = () => {
    // Guardamos el carrito en localStorage directamente desde el contexto
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };


  const fetchEnviarPdf = async () => {
      setenviarCarrito(true);
      try {
        const response = await backEndApi.post(`/generarPdfArticulos` ,{
          carrito,      // El primer parámetro
          usuario: rfc,  // El segundo parámetro
        },
          
          {
            headers: {
              'Cache-Control': 'no-cache', // Evita que el navegador use la caché
              'Pragma': 'no-cache', // Evita que los proxies usen la caché
            }
          })
        .then(res => {
            const status = res.data.status;

            setenviarCarrito(false);
            if(status){
              // localStorage.setItem("carrito", JSON.stringify([]));
              actualizarCarrito([]);
              alert("Articulos enviados correctamente!");
            }else{
              alert("Ocurrio un error!");
            }
          
            
        });

      //  setDataTicketsvales);
        
      } catch (error) {
        setenviarCarrito(false);
        alert('error');
      }
   };



  return (
    <Grid
      container
      padding={5}
      spacing={2}
      // direction="column"
      sx={{
        // width: "80%",
        // margin: "0 auto",
      }}
    >
      {loading && (
        <div id="overlay">
          <img
            src="https://dexdelnoroeste.com/wp-content/uploads/2024/05/loading.gif"
            alt="Loading..."
          />
        </div>
      )}

      <Grid item xs={12} md={!vista ? 12 : 8}>
        <Box className="filters" sx={{ mb: 2, mt: 3 }}>

          <Paper sx={{ padding: 5 }} elevation={5}>
            <Typography sx={{ mb: 2 }} variant="h6">Filtros:</Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
              <TextField
                select
                label="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="PAPELERIA">Papelería</MenuItem>
                <MenuItem value="LIMPIEZA">Limpieza</MenuItem>
                <MenuItem value="COMPUTO">Cómputo</MenuItem>
                <MenuItem value="EMPAQUE">Empaque</MenuItem>
                <MenuItem value="VARIOS">Varios</MenuItem>
              </TextField>

              <TextField
                label="Buscar producto"
                value={productoTexto}
                placeholder="Nombre del producto, marca"
                onChange={(e) => setProductoTexto(e.target.value)}
                sx={{ flex: 1, minWidth: 300 }}
              />
            </Box>
          </Paper>


        </Box>

        {/* Paginación */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", mb: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>

        <main className="gridCustom">
          {productos.map((producto, index) => {
            const tiempoUnix = Math.floor(Date.now() / 1000);
            const url =
              producto.url !== ""
                ? `https://dexdelnoroeste.s3.us-east-2.amazonaws.com/${producto.url}?${tiempoUnix}`
                : "https://dexdelnoroeste.com/wp-content/uploads/2024/05/no-photo-available.png";

            const cantidad = cantidades[producto.id] || 0;
            const total = producto.precio * cantidad;

            return (
              <article key={index}>
                <img src={url} alt="Producto" />
                <div className="text">
                  <div>{producto.unidad}</div>
                  <p className="grupo">PRECIO: ${producto.precio}</p>
                  <p className="marca">MARCA: {producto.marca}</p>
                  <p className="titulo">{producto.descripcion_producto}</p>

                </div>
                {/* Contador y botones */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "center",  // Esto centrará los botones horizontalmente
                    mt: 2, mb: 1 // Opcional: agrega espacio arriba del box
                  }}
                >
                  {
                    carrito.some((item) => item.id === producto.id) ?

                      <>
                        <Button sx={{ mb: 1 }} variant="outlined" onClick={() => disminuirCantidad(producto.id)}>
                          -
                        </Button>
                        <Typography sx={{ mb: 1 }}>
                          {
                            carrito.find((item) => item.id === producto.id)?.cantidad || 0
                          }
                        </Typography>
                        <Button sx={{ mb: 1 }} variant="outlined"
                          onClick={() => aumentarCantidad({
                            id: producto.id,
                            nombre: producto.nombre,
                            descripcion: producto.descripcion_producto,
                            precio: producto.precio,
                            url: url
                          })}
                        >
                          +
                        </Button>
                      </>



                      :
                      <Button variant="contained" fullWidth sx={{
                        m: 1, background: "#F7CA00", '&:hover': {
                          backgroundColor: '#FF7F00', // Color de fondo al pasar el ratón
                        }
                      }} onClick={() => aumentarCantidad({
                        id: producto.id,
                        nombre: producto.nombre,
                        descripcion: producto.descripcion_producto,
                        precio: producto.precio,
                        ur: url
                      })} >Agregar</Button>
                  }


                </Box>
              </article>
            );
          })}
        </main>

        {/* Paginación */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", mb: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Grid>

      {
        vista &&
        <Grid item xs={12} md={4}  >
          <Paper sx={{ padding: 5, mt: 3 }} elevation={5}>
            <Typography sx={{ mb: 2 }} variant="h4">Carrito</Typography>


            <Typography sx={{ mb: 2 }} variant="h6">Subtotal ({totalCantidad} articulos ) : ${totalPrecio.toFixed(2)}</Typography>


            <Button variant="contained" fullWidth sx={{
              m: 1, background: "#F7CA00", '&:hover': {
                backgroundColor: '#FF7F00', // Color de fondo al pasar el ratón
              }
            }} 
            disabled={enviarCarrito || carrito.length == 0}
            onClick={
              ()=> fetchEnviarPdf()
            }
            >
              {
                enviarCarrito ?  <center><CircularProgress></CircularProgress></center> : "ENVIAR"
              }
              
              </Button>

           
              <div>
  {carrito.map((producto) => (
    <div key={producto.id} style={{ marginBottom: "15px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Alinea verticalmente los elementos
          gap: 2, // Espacio entre la imagen y la descripción
          padding: "10px", // Opcional: espacio interno para mejorar la apariencia
          border: "1px solid #ddd", // Opcional: bordes suaves para cada fila
          borderRadius: "8px", // Bordes redondeados
        }}
      >
        {/* Imagen del producto */}
        <img
                              src={producto.ur} // Reemplaza con el atributo real de la imagen
                              alt={producto.descripcion}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "8px", // Bordes redondeados (opcional)
            objectFit: "cover", // Ajusta la imagen para que no se deforme
            border: "1px solid #ddd", // Opcional: bordes suaves
          }}
        />

        {/* Descripción y botones */}
        <Box
          sx={{
            flex: 1, // Ocupa el espacio restante
            display: "flex",
            flexDirection: "column", // Organiza la descripción y botones verticalmente
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {producto.descripcion}
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Subtotal: ${(producto.cantidad * producto.precio).toFixed(2)}
          </Typography>
        </Box>

        {/* Botones */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            size="small"
            variant="text"
            onClick={() => disminuirCantidad(producto.id)}
          >
            -
          </Button>
          <Typography>{producto.cantidad}</Typography>
          <Button
            size="small"
            variant="text"
            onClick={() =>
              aumentarCantidad({
                id: producto.id,
                nombre: producto.nombre,
                descripcion: producto.descripcion_producto,
                precio: producto.precio,
              })
            }
          >
            +
          </Button>
        </Box>
      </Box>
    </div>
  ))}
</div>



          </Paper>
        </Grid>
      }



    </Grid>
  );
}
