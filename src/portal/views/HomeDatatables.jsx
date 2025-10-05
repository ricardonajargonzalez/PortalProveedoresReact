import { ArrowDownward, ArrowDropDown, Clear, Close, CropSquare, DeleteSweep, Edit, FileCopy, FilterAlt, FilterAltOff, KeyboardArrowDown, Print, Save, Settings, SettingsOverscan, SettingsSuggest, Share, Tune, UploadFile, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, CircularProgress, Dialog, DialogTitle, Divider, FormControl, Grid, IconButton, 
  InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Snackbar, SpeedDial, SpeedDialAction, SpeedDialIcon, TextField, TextareaAutosize, Typography, useMediaQuery } from "@mui/material"
import React, { useEffect, useMemo, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import 'dayjs/locale/es';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayjs from 'dayjs';
import { backEndApi } from "../../api/BackEndApi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { cargarDocumentos, cargarTickets } from "../../store/portal/thunks";
import { NoResultadosDatatables } from "../componentes/NoResultadosDatatables";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { useCallback } from "react";
import axios from "axios";
import Chart from 'react-apexcharts';
import { styled, alpha } from '@mui/material/styles';
import { backEndApiMA } from "../../api/BackEndApiMasAdmin";
import ExpandableComponent from "../componentes/ExpandableComponent";
import CustomLoader from "../componentes/CustomLoader";
import { useArticulos } from "../../hooks/useArticulos";
import { Document, Page, pdfjs  } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


const emails = ['username@gmail.com', 'user02@gmail.com'];



const TextareaC = ({  handleTexto, textovalue }) =>(
  <>
      <TextareaAutosize 
                   value={textovalue}
                  onChange={handleTexto} 
                  
              /> 
  </>
);

const SimpleDialogRechazar = React.memo((props) => {
  const { onClose, open, dwCodid, handleRechazarVale, setTexto, texto, rfc, errorRechazar,msjErrorRechazar, setErrorRechazar, setMsjErrorRechazar } = props;





  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid
        container
        spacing={1}
        style={{ height: '100%' }}
        sx={{ padding: 1 }}
      >
        <Grid item xs={6} md={12}>
          <center>
            <Typography variant="h6" component="h2">
             Favor de indicar el motivo de rechazo:
            </Typography>
          </center>
        </Grid>
        <Divider />
        <Grid item xs={12} md={12}>
          <center>
            <TextareaAutosize    minRows={3} style={{ width: '100%' }} onChange={(e) => {setTexto(e.target.value);   } } value={texto} />
          </center>
          {
            texto.length > 0 &&
            <Typography>
              Total de caracteres {texto.length} de 235
            </Typography>
          }

          {
            errorRechazar == true &&
            <Alert severity="error">{msjErrorRechazar}</Alert>
          }
        </Grid>
        <Grid item xs={6} md={6}>
          <center>
            <Button
              onClick={() => {
                if(texto.length > 0 && texto.length <= 235){
                  handleRechazarVale(dwCodid, texto, rfc);
                }else if(texto.length > 235){
                   alert("El motivo de rechazo tiene un limite de 235 caracteres!");
                }else if(texto.length == 0){
                   alert("Por favor de llenar el motivo del rechazo!");
                }
               
              }}
              variant="contained"
            >
              Rechazar
            </Button>
          </center>
        </Grid>
        <Grid item xs={6} md={6}>
          <center>
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
          </center>
        </Grid>
      </Grid>
    </Dialog>
  );
});


const FilterComponent = ({ fechainicio, setFechaInicio, refTask, filtroTask,onFilterTask, filtroCliente,onFilterCliente, filtroTecnico,onFilterTecnico,filtroEquipo,onFilterEquipo,   filterEmpresa,onFilterCombo }) => (

  < >
      <Grid container spacing={1} >

          <Grid item xs={12} md={2}>
              <TextField id="taskfiltro" label="Task" variant="outlined"
               value={filtroTask}
               onChange={onFilterTask}
               ref={refTask}
              />
          </Grid>

          <Grid item xs={12} md={2}>
              <TextField id="clientefiltro" label="Cliente" variant="outlined"
               value={filtroCliente}
               onChange={onFilterCliente}
              />
          </Grid>
          <Grid item xs={12} md={2}>
              <TextField id="tecnicofiltro" label="Tecnico" variant="outlined"
               value={filtroTecnico}
               onChange={onFilterTecnico}
              />
          </Grid>
          <Grid item xs={12} md={2}>
              <TextField id="equipofiltro" label="Equipo" variant="outlined"
              key={1234}
               value={filtroEquipo}
               onChange={onFilterEquipo}
              />
          </Grid>

          <Grid item xs={12} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DatePicker 
                label="Fecha"
                value={fechainicio}
                onChange={(newValue) => setFechaInicio(newValue)}
                renderInput={(params) => <TextField sx={{ width: {xs: '100%'} }} {...params} />}
              />
            </LocalizationProvider>
          </Grid>

        <Grid item xs={12} md={2}>
            <FormControl sx={{ width: {xs: '100%'} }} >
            <InputLabel htmlFor="demo-simple-select-empresa">Estado</InputLabel>
                <Select
                    id="demo-simple-select-empresa"
                    label="Age"
                    onChange={onFilterCombo}
                    value={filterEmpresa}
                    sx={{p: 0}}
                  >
                        <MenuItem value="Nuevo Servicio">Nuevo</MenuItem>
                        <MenuItem value="En Proceso">En proceso</MenuItem>
                        <MenuItem value="Todos">Todos</MenuItem>
                  </Select>
                  </FormControl>
          </Grid>



      </Grid>
          

  </>
);



const sortIcon = <KeyboardArrowDown />;

export const HomeDatatables = () => {

  const now = dayjs();

  const [filteredItems, setfilteredItems] = useState([]);
  const [datarow, setDataRow] = useState([]);
  const [fechainicio, setFechaInicio] = useState(null);
  const [fechafin, setFechaFin] = useState(now);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.documentos);
  const { empresa, email, rfc,isadmin } = useSelector(state => state.auth);
  const [filterEmpresa, setFilterempresa] = useState('Todos');
  const [expandir, setexpandir] = useState(false);
  const { dataTickets, columns, loading, timeLeft, openPDF,handleClosenPDF,dwCodid,pdfUrl,loadingPdf,loadingActualizar,isOkActualizar,handleRefreshTabla,rechazarVale,handleClosenValeRechazar
   } = useArticulos() //
  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const [mostrarFiltro, setmostrarFiltro] = useState(false);
  const [openSB, setOpenSB] = useState(false);
  const [filtroTask, setfiltroTask] = useState('');
  const [filtroCliente, setfiltroCliente] = useState('');
  const [filtroTecnico, setfiltroTecnico] = useState('');
  const [filtroEquipo, setfiltroEquipo] = useState('');
  const [openDialog, setopenDialog] = useState(openPDF);
  const [actualizarVale, setactualizarVale] = useState(isOkActualizar);
  const [openDialogRechazar, setopenDialogRechazar] = useState(rechazarVale);
  const [errorRechazar, setErrorRechazar] = useState(false);
  const [msjErrorRechazar, setMsjErrorRechazar] = useState('');



  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleMostrarFiltros = () => {
    setmostrarFiltro(!mostrarFiltro);
  };

  const handleCloseModal = (value) => {
    setOpenModal(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log('ticketsssss ' + JSON.stringify(dataTickets));
  }, [dataTickets])




  useEffect(() => {
     
     if(openPDF){
      setopenDialog(true);
     }else{
      setopenDialog(false);
     }
       
   
  }, [openPDF]);

  useEffect(() => {
     
    if(isOkActualizar){
     setactualizarVale(true);
     handleRefreshTabla();

    }else{
      setactualizarVale(false);
    }

 
  
 }, [isOkActualizar]);


 useEffect(() => {
     
  if(rechazarVale){
    setopenDialogRechazar(true);
    console.log(1);

  }else{
    setopenDialogRechazar(false);
    console.log(2);
  }

  setMsjErrorRechazar('');
  setErrorRechazar(false);
    
    
   
}, [rechazarVale]);


  

  const localizedTextsMap = {
    columnMenuUnsort: "não classificado",
    columnMenuSortAsc: "Classificar por ordem crescente",
    columnMenuSortDesc: "Classificar por ordem decrescente",
    columnMenuFilter: "Filtro",
    columnMenuHideColumn: "Ocultar",
    columnMenuShowColumns: "Mostrar colunas"
  };


  const myNewTheme= {
    rows: {
      fontSize: '10px'
    }
  }

  const onDocumentacion = () =>{
    const url = import.meta.env.VITE_URL_FORMULARIO
    window.open(url, '_blank');
  }

  const customStyles = {
    headCells: {
      style: {
        color: 'black',
        fontWeight : 'bold'
      },
    },
  };
  const customPaginationOptions = {
    rowsPerPageText: 'Tickets por página:',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const expandableRows = [0];
  const optionsFiltros = {
    paginationRowsPerPageOptions: [10, 20, 50, 100], // Aquí puedes agregar las opciones que desees
  };


   //aciones para los botones
   const actions = [
    { icon: <SettingsOverscan />, name: 'Expandir', action : 'expandir' },
    { icon: <CropSquare />, name: 'Contraer',  action : 'contraer' },
    { icon: mostrarFiltro ?  <FilterAltOff/> : <FilterAlt />, name: 'filtros', action: 'filtros' },
   // { icon: <Share />, name: 'Share' },
  ];

  const handleAccionSetting = (accion) =>{
      switch ( accion ) {
        case 'expandir' :
          setexpandir(true);
        break;
        case 'contraer' :
          setexpandir(false);
        break;
        case 'filtros' :
          handleMostrarFiltros();
        break;
       
      }
  }

  const refTask = useRef(null);

  useEffect(() => {
    if (refTask.current) {
      refTask.current.focus();
    }
  }, []);
  



  const subHeaderComponentMemo = useMemo(() => {

  

    return (
     <FilterComponent  
       filtroTask={filtroTask}  onFilterTask={e => setfiltroTask(e.target.value)    }   
       filtroCliente={filtroCliente}  onFilterCliente={e => setfiltroCliente(e.target.value)}   
       filtroTecnico={filtroTecnico}  onFilterTecnico={e => setfiltroTecnico(e.target.value)}   
       filtroEquipo={filtroEquipo}  onFilterEquipo={e => setfiltroEquipo(e.target.value)}  
       onFilterCombo={e => setFilterempresa(e.target.value)}  filterempresa={filterEmpresa}
       fechainicio={fechainicio} setFechaInicio={setFechaInicio}
      />
      
    );
  }, [ filterEmpresa, filtroTask,filtroCliente,filtroTecnico,filtroEquipo,refTask,fechainicio]);



  //cargamos los datos de los tickets en la tabla
  useEffect(() => {
         setfilteredItems(filtrador(filterEmpresa,dataTickets,filtroTask,filtroCliente,filtroTecnico,filtroEquipo,fechainicio));
  }, [dataTickets,filtroTask])

  //filtrar cada vez que cambie filtro estatus

  useEffect(() => {
    setfilteredItems(filtrador(filterEmpresa,dataTickets,filtroTask,filtroCliente,filtroTecnico,filtroEquipo,fechainicio));
}, [filterEmpresa,filtroTask,filtroCliente,filtroTecnico,filtroEquipo,fechainicio])

  


  //funcion para filtrar los ticket datatables
  const filtrador = ( filterEmpresa,dataTickets,filtroTask,filtroCliente,filtroTecnico,filtroEquipo,fechainicio) => {
   
     console.log(dayjs(fechainicio).format('YYYY-MM-DD'));
      
      return dataTickets;
  }

 

   let height = mostrarFiltro ? 215 : 150;



   const memoizedTimeLeft = useMemo(() => timeLeft, [timeLeft]);


   useEffect(() => {
    if(memoizedTimeLeft== 60000){ //millisegundos
      setOpenSB(true);
      //console.log('falta 11111 minuto');
    }

    if(memoizedTimeLeft== 1000){ //millisegundos
      setOpenSB(false);
      //console.log('falta 11111 minuto');
    }

   // console.log(memoizedTimeLeft)
}, [memoizedTimeLeft])

   //cerrar snackbar
   const handleCloseSB = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSB(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSB}
      >
        <Close fontSize="small" onClick={handleCloseSB} />
      </IconButton>
    </>
  );

  const [filtroPrueba, setfiltroPrueba] = useState('');

  const filtroP = (e) =>{
       setfiltroPrueba(e.target.value);
  }

//==================================

const [loadingTickets, setLoadingTickets] = useState(false);
const [dataRowsTickets, setDataTickets] = useState([]);
const [texto, setTexto] = useState('');


useEffect(() => {

  const fetchData = async () => {
    setLoadingTickets(true);
     try {
       const response = await backEndApi.post(`/tickets/`,{dominio: import.meta.env.VITE_DOMINIO});
       setDataTickets(   flltredDataRowsTickets(response.data)  );
       setLoadingTickets(false);
     } catch (error) {
       //console.log("Error fetching data: ", error);
       setLoadingTickets(false);
     }
   };

}, [])

const flltredDataRowsTickets = (data) => {
    
     return  data.filter(
         item => item.id && item.id.toLowerCase().includes(filtroTask.toLowerCase()),
     );
}

const [filtroprueba, setFiltroPrueba] = useState('');



  const FilterComponentPrueba = ({ filtroprueba, onFilter }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By Name"
        aria-label="Search Input"
        value={filtroprueba}
        onChange={onFilter}
      />
    </>
  );



const subHeaderComponentMemoprueba = useMemo(() => {
  const handleClear = () => {
    if (filtroprueba) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFiltroPrueba('');
    }
  };


  return (
    <FilterComponentPrueba onFilter={e => setFiltroPrueba(e.target.value)}  filtroprueba={filtroprueba} />
  );
}, [filtroprueba, resetPaginationToggle]);




    function SimpleDialog(props) {
      const { onClose, open } = props;

      const handleClose = () => {
        onClose();
      };

      const handleListItemClick = (value) => {
        onClose(value);
      };


      return (
        <Dialog onClose={handleClose} open={open}>

         <Grid
                container
                spacing={1}
                style={{ height: '100%' }}
                sx={{  padding: 1 }}
              >

                <Grid item xs={12} md={12}  >
                    {
                        loadingPdf  ?
                        <center> <CircularProgress /></center> 
                        :
                        <Document
                                  file={pdfUrl}
                                  onLoadSuccess={onDocumentLoadSuccess}
                                >
                                  <Page pageNumber={pageNumber} />
                        </Document>
                      }  
                </Grid>
          </Grid>

        </Dialog>
      );
    }

    const textareamemo = useMemo(() => {

      return (
        <TextareaC 
           handleTexto={e => setTexto(e.target.value)}  
          // textovalue={texto} 
        />
      );
    }, [texto]);






    
    const handleRechazarVale = async (dwCodid,texto, rfc) => {
      // setloadingPdf(true);
        try {
          const response = await backEndApi.post(`/rechazarValee_sensajal/`,{dominio: import.meta.env.VITE_DOMINIO, documentoid : dwCodid, texto: texto, rfc: rfc})
          .then(res => {
            if(res.data.status){
              handleCloseValeRechazar();
              handleRefreshTabla();
              setErrorRechazar(false);
              setMsjErrorRechazar('');
            }else{
              console.log("Error el rechazar vale ");
              setErrorRechazar(true);
              setMsjErrorRechazar(res.data.msg);
              handleRefreshTabla();
            }
              
          });

        //  setDataTicketsvales);
          
        } catch (error) {
          console.log("Error fetching data: ", error);
          setErrorRechazar(true);
          setMsjErrorRechazar(error);
          handleRefreshTabla();
        }
      };

    


    const handleClosePDF = () => {
       handleClosenPDF();
    };

    const handleCloseValeRechazar = () => {
       handleClosenValeRechazar();
    };

    const handleChangeTexto = (value) => {
       setTexto(value);
   };

    

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }


  const handleCloseSBAutorizar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setactualizarVale(false);
  };

  const actionSBAutorizar = (
    <>
      <Button color="secondary" size="small" onClick={handleCloseSBAutorizar}>
        x
      </Button>
    </>
  );

  return (
    <div style={{ height: 'calc(100vh - 56px)' }}>

        <Snackbar
          open={actualizarVale}
          autoHideDuration={6000}
          onClose={handleCloseSBAutorizar}
          message="Vale autorizado"
          action={actionSBAutorizar}
        />
   
      <SimpleDialog
        open={openDialog}
        onClose={handleClosePDF}
      />

      <SimpleDialogRechazar
        open={openDialogRechazar}
        onClose={handleCloseValeRechazar}
        dwCodid={dwCodid}
        handleRechazarVale={handleRechazarVale}
        setTexto={setTexto}
        texto={texto}
        rfc={rfc}
        errorRechazar={errorRechazar}
        msjErrorRechazar={msjErrorRechazar}
        setErrorRechazar={setErrorRechazar}
        setMsjErrorRechazar={setMsjErrorRechazar}
      />
 
    <Grid
      container
      spacing={1}
      style={{ height: '100%' }}
     sx={{  padding: 1 }}
    >
      <Grid item xs={12} md={12}  >
        <Typography>prueba</Typography>

        <Paper sx={{ padding: 1 }} elevation={5}>
                <DataTable  
                  fixedHeader
                  fixedHeaderScrollHeight={`calc(100vh - ${height}px)`}
                  columns={columns}
                  data={dataTickets}
                  progressPending={loading}
                  pagination
                  paginationComponentOptions={customPaginationOptions}
                  sortIcon={sortIcon}
                  progressComponent={<CustomLoader />}
                  customStyles={customStyles}
                  noDataComponent={ <NoResultadosDatatables  /> } 
                  paginationPerPage={50}
                  {...optionsFiltros}
                />




          </Paper>

      </Grid>

    </Grid>
    </div>
  )
}
