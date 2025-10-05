
import { AccountCircle, ContentPasteSearch, FactCheck, Inbox, Mail, ManageAccounts, MenuOutlined, Notifications, NotificationsActive, ShoppingCart } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, Button, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/auth";
import perfil from '../../assets/img/perfil.png'
import { cargarNotificaciones } from "../../store/notificaciones/thunks";
import dayjs from 'dayjs';
import { deepOrange } from "@mui/material/colors";
import logo from '../../assets/img/leoni.png'
import wa from '../../assets/img/WhatsApp_icon.png'
import { useCart } from "../views/Cartcontext";
import { useCarrito } from "../views/Carritocontexto";


// const drawerWidth = 240;
const navItems = ['Dashboard', 'Mi cuenta', 'Cerrar sesión'];

export const SideBar = ({ drawerWidth = 240, mostrar = 1 }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifi, setNotifi] = useState(null);

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
   
    setMobileOpen( (prevState) => !prevState );

  };

  const { proveedor, email, rfc,isadmin } = useSelector(state => state.auth);
  const { count,notificaciones } = useSelector(state => state.notifi);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        APPCITAS
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = (event) => {
    setNotifi(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotifi(null);
  };
  const logOut = () => {
    handleClose(null);
    dispatch(logout({errorMessage: null}));
    navigate('/auth/login', { replace: true })
  }

  const miCuenta = () =>{
    navigate('/dashboard/account/', { replace: false })
  }

  //   const container = window !== undefined ? () => window().document.body : undefined;


  useEffect(() => {
     dispatch( cargarNotificaciones(rfc) ) 
  }, []);

  const inicio = () => {
    navigate('/dashboard', { replace: true })
  }

  // URL del icono de WhatsApp (reemplázalo con la URL de tu icono o una importación local)
const whatsappIconUrl = 'https://example.com/whatsapp-icon.png';

// Número de teléfono en formato internacional
const phoneNumber = '+526624683194'


const { totalProductos } = useCart();
const { vista, toggleVista } = useCarrito(); // Usamos el contexto
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{backgroundColor: '#1591ea',  borderBottom: '4px solid #003A8A'}}  elevation={0} component="nav">
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={ inicio }> 
            <MenuOutlined sx={{ color: '#003A8A' }} />
          </IconButton>
          <Typography style={{color: '#003A8A'}}
            component="div" 
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}
          >
            <img style={{width: '130px'}} src={`${import.meta.env.VITE_URL_BASE}${logo}`} />
           
          </Typography>

          <Typography style={{color: 'white'}}
            component="div" 
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}
          >
          <a 
      href={`https://wa.me/${phoneNumber}`} // Enlace a WhatsApp Web
      target="_blank" // Abre en una nueva pestaña
      rel="noopener noreferrer" // Seguridad adicional para abrir enlaces en nuevas pestañas
      style={{ display: 'inline-block', textDecoration: 'none', color: 'white' }}
    > <img style={{width: '20px'}} src={`${import.meta.env.VITE_URL_BASE}${wa}`} /> Contacte a tu agente asignado 
     </a>
           
          </Typography>
          <IconButton
            onClick={toggleVista}
            color="inherit">
      <Badge
        badgeContent={totalProductos}
        color="warning"
        overlap="circular"
        max={99} // Cambia el máximo que se muestra como 99+
      >
        <ShoppingCart  />
      </Badge>
    </IconButton>
         <Typography>{rfc}</Typography>


          <Box sx={{ flexDirection : { xs: 'row-reverse', md: ''  }, display: 'flex', width: {xs: '100%', md: '40px'} }}>
          {/* <Box sx={{background: 'red', width: '100%',    display: 'flex', flexDirection: 'row-reverse'}}> */}

          <IconButton
              size="large"
              edge="end"
              aria-label="Usuario"
              aria-controls={1}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>
       

            <Menu sx={{mt:6}}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem
              onClick={miCuenta}
              >Mi cuenta
              </MenuItem> */}
              <MenuItem
                onClick={logOut}
              >Cerrar sesión</MenuItem>
            </Menu>

            <Menu  sx={{mt:6, p: 1, minHeight: 250, maxHeight: 250, overflow: 'auto' }}
             disableScrollLock={true}
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              //anchorEl={anchorEl}
              // open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(notifi)}

              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >

               { notificaciones.map( (item, index) => {

                    const itemnotificacion = JSON.parse(item.descripcion);
                    console.log(itemnotificacion);
                    const fecha = new Date(itemnotificacion.DWMODDATETIME).toLocaleString("es-MX", {timeZone: "US/Arizona"}); // 8/19/2020, 9:29:51 AM. (date and time in a specific timezone);

                   return  <MenuItem 
                   key={index} 
                   onClick={handleClose}>
                   <ListItemIcon>
                     <Avatar   sx={{ bgcolor: '#d32f2f', height: '30px', width: '30px' }}>
                       <FactCheck fontSize="small" />
                     </Avatar>
                   </ListItemIcon>   
                     <ListItemText sx={{pl:1}} primary={<Typography sx={{fontSize: 12, fontWeight: 'bold'}}>{`La factura ${itemnotificacion.NUMERO_FACTURA} con el numero de orden ${itemnotificacion.NUMERO_DE_OC} fue pagada`}</Typography>}  secondary={<Typography sx={{fontSize: 11}} >{`${fecha}`}</Typography>} />
                 </MenuItem>;
               } )

               }

            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            color: '#ffffff',
            // display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ContentPasteSearch />
                </ListItemIcon>
                <Link style={{ textDecoration: 'none', color: '#6b6b6b' }} to="/dashboard" >
                  <ListItemText primary="Inicio" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </Box>
  );


}
