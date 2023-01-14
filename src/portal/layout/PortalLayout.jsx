import { Box, Toolbar } from "@mui/material"
import { SideBar } from "../componentes/SideBar";


const drawerWidth = 320;
const mostrar = 1;

export const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>


       <SideBar drawerWidth={ drawerWidth } mostrar = {mostrar} />
        <Box 
        component='main'
        sx={{ flexGrow: 1, p: 0, 
          backgroundColor: 'rgb(245, 245, 245)', 
          height:"100vh", 
        }}
        >
            <Toolbar />
            { children }
        </Box>
    </Box>
  )
}
