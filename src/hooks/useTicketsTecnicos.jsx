

import { backEndApi } from "../api/BackEndApi";
import { useEffect, useState } from "react";



export const useTicketsTecnicos = () => {

    const [tecnicos, setTecnicos] = useState([]);
    const [ticketAbierto, setTicketAbiertos] = useState([]);
    const [loading, setLoading] = useState(false);

      
    const fetchData = async () => {
      setLoading(true);
       try {
         const response = await backEndApi.post(`/tecnicostickets/`,{dominio: import.meta.env.VITE_DOMINIO});
          setTecnicos(response.data.tecnico);
          setTicketAbiertos(response.data.data);
          console.log(response.data.data);
          console.log(response.data.tecnico);
          if (response.data.data && Array.isArray(response.data.data)) {
             // Asignar el arreglo a la variable 'series'
             series = response.data;
             console.log('si');
           } else {
             console.log('La respuesta no contiene datos válidos.');
           }
         // setLoading(false);
       } catch (error) {
         console.log("Error fetching data: ", error);
         // setLoading(false);
       }
     };

      useEffect(() => {
        fetchData(); // Initial data fetch
        const intervalId = setInterval(fetchData, 600000); // 10 minutos
        //const intervalId = setInterval(fetchData, 60000); // 1 minuto
        return () => {
          clearInterval(intervalId); // Clear the interval on component unmount
        };
      }, []);

      let series = [{
        data: ticketAbierto
      }];
      
      
      let options = { //data on the x-axis
      chart: { id: 'bar-chart'},
      plotOptions: {
        bar: {
          barHeight: '800px',
          distributed: true,
          horizontal: false,
          borderRadius: 4,
          dataLabels: {
            position: 'bottom'
          },
        },
      },
      legend: {
        show: false, // Ocultar la leyenda
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
                      '#f48024', '#69d2e7'
                    ],
                    xaxis: {
                      categories: tecnicos,
                    },yaxis: {
                      labels: {
                        show: false
                      }
                    },dataLabels: {
                      enabled: true,
                      textAnchor: 'start',
                      style: {
                        colors: ['#000']
                      },
                      formatter: function (val, opt) {
                        return  val
                      },
                      offsetX: -7,
                      dropShadow: {
                        enabled: true
                      }
                    }, stroke: {
                      width: 1,
                      colors: ['#fff']
                    },tooltip: {
                      theme: 'dark',
                      x: {
                        show: false
                      },
                      y: {
                        title: {
                          formatter: function () {
                            return ''
                          }
                        }
                      }
                    },title: {
                      text: 'Ticket abierto por tecnico',
                      align: 'center',
                      floating: true
                  }, noData: {
                    text: 'Loading...'
                  }
                  
      };

    


  return {
    tecnicos,ticketAbierto,options,series
  }
}
