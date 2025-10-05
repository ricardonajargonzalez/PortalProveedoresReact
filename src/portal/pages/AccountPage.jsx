import { Button, Grid, TextField, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export const AccountPage = () => {
  const { empresa, email, rfc } = useSelector(state => state.auth);


  return (

<Grid 
    container
    spacing={ 0 }
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh', backgroundColor: 'background.main', padding: 4 }}
    >

      <Grid 
      item
      className="box-shadow"
      xs={ 3 }
      sx={{ 
        width: { md: 450 },
        backgroundColor: 'white', 
        padding: 3, 
        borderRadius: 2 
        }}
      >
        {/* {classAnimated} */}
        <center>
        <Grid sx={{ mt: 5 }} item xs={12} >
        <TextField
          disabled
          id="outlined-disabled"
          label="RFC"
          defaultValue={rfc}
        />
      </Grid>

      <Grid sx={{ mt: 2 }} item xs={12} >
        <TextField
          disabled
          id="outlined-disabled"
          label="Correo electrónico"
          defaultValue={email}
        />
      </Grid>

      <Grid sx={{ mt: 2 }} item xs={12} >
        <Link style={{textDecoration: 'none'}} to="/dashboard/changepassword">
           <Button variant="contained">Cambiar contraseña</Button>
        </Link>
      </Grid>
        </center>
         

    


      </Grid>
    </Grid>

  )
}
