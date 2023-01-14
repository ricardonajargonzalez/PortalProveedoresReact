
import { MenuOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

// const drawerWidth = 240;
const navItems = ['Mis Documentos', 'Mi cuenta', 'Cerrar sesión'];

export const SideBar = ({ drawerWidth = 240, mostrar = 1 }) => {

    // const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };

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



//   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar elevation={0} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            // sx={{ mr: 2, display: { sm: 'none' } }}
          >
             <MenuOutlined sx={{color: '#ffff'}} />
          </IconButton>
          <Typography
            // variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            PORTAL PROVEEDORES
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button href="/Acerca" key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
        //   container={container}
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
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );  


}
