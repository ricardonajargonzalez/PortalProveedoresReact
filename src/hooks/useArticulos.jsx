import { backEndApi } from "../api/BackEndApi";
import dayjs from 'dayjs';
import { Button } from "@mui/material";
import { Check, CloudDownload, NotificationImportant } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import imgdone from '../assets/img/check.png';
import imgno from '../assets/img/noimageempty.png'



export const useArticulos = () => {




    const [articulos, setArticulos] = useState([]);
    const [loading, setLoading] = useState(false);
    const {  rfc, proveedorId } = useSelector(state => state.auth);
    

    useEffect(() => {
      fetchData();
    }, [])

   

      const fetchData = async () => {
        setLoading(true);
         try {
           const response = await backEndApi.get(`/productos/${proveedorId}` ,{
              headers: {
                'Cache-Control': 'no-cache', // Evita que el navegador use la caché
                'Pragma': 'no-cache', // Evita que los proxies usen la caché
              }
            })
           .then(res => {
              const productos = res.data.results;
              console.log(productos);
                  
              setArticulos(productos);
              setLoading(false);
           });

         //  setDataTicketsvales);
           
         } catch (error) {
           console.log("Error fetching data: ", error);
           setLoading(false);
         }
       };

    
       const handlerFetchArticulos = () =>{
         fetchData();
       }



    
    const columns = [

              {
          name: 'ID',
          selector: row => row.id,
          maxWidth: "10px"
        },
        {
          name: 'Grupo',
          selector: row => row.grupo,
          sortable: true,
          hide: 'sm',
          maxWidth: "90px"
        },
        {
          name: 'Marca',
          selector: row => row.marca,
          sortable: true,
          hide: 'sm',
          maxWidth: "130px"
        },
        {
          name: 'Unidad',
          selector: row => row.unidad,
          sortable: true,
          hide: 'sm',
          maxWidth: "90px",
        },
        {
          name: 'Descripcion',
          selector: row => row.descripcion_producto,
          sortable: true,
          hide: 'sm',
          grow: 1
        },
        {
          name: '',
          maxWidth: "20px",
          cell: row => (
            <img  src={row.url == '' ? `${imgno}` : `${imgdone}`}  alt="Imagen" style={{ width: 50, height: 50 }} />
          )
        }
      ];


      
  return {
    columns, articulos ,loading, handlerFetchArticulos
  }
}
