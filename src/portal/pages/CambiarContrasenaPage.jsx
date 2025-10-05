import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks";
import { cambiarPassword, ressetMessageChangePassword } from "../../store/auth";

export const CambiarContrasenaPage = () => {

    const { empresa, email, rfc, errorChangePassword, successChangePassword } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isErrorMessagePassword  = useMemo( () => errorChangePassword != null, [errorChangePassword] );
    const isSucessMessagePassword  = useMemo( () => successChangePassword != null, [successChangePassword] );

    useEffect(() => {
       dispatch( ressetMessageChangePassword() )
    }, [])
    

    const { passn, passa, onInputChange } = useForm({
        email: '',
        password: ''
      });

    const submit = (event) =>{
        event.preventDefault();
        dispatch( cambiarPassword(rfc, passa, passn, email) );
    }

    const [animatedError, setanimatedError] = useState('');

    useEffect(() => {
      if(isErrorMessagePassword){
        setanimatedError('animate__animated animate__shakeX')
      } 
  
    }, [isErrorMessagePassword]);


    useEffect(() => {
        if(isSucessMessagePassword){
          setanimatedError('animate__animated animate__bounce')
        } 
    
      }, [isSucessMessagePassword]);

    return (
          <form onSubmit={submit}>
          <Grid item xs={12} sx={{backgroundColor: 'background.main', pl: 2}} >
            <Typography variant="h6" >Mi cuenta</Typography>
          </Grid>
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
              label="Usuario"
              defaultValue={rfc}
            />

<Grid sx={{ mt: 2 }} item xs={12} >
            <TextField
              id="outlined-disabled"
              label="Contraseña actual"
              name="passa"
              value={passa}
              onChange={onInputChange}
            />
          </Grid>

          <Grid sx={{ mt: 2 }} item xs={12} >
            <TextField
              id="outlined-disabled"
              label="Nueva Contraseña"
              name="passn"
              value={passn}
              onChange={onInputChange}
            />
          </Grid>

          {
           errorChangePassword &&
           <Grid sx={{mt:1}} item xs={12}>
               <Alert sx={{width: '400px'}} className={animatedError} severity="error">{errorChangePassword}</Alert>
            </Grid>
           } 

{
           successChangePassword &&
           <Grid sx={{mt:1}} item xs={12}>
               <Alert sx={{width: '400px'}} className={animatedError} severity="success">{successChangePassword}</Alert>
            </Grid>
           } 
    
          <Grid sx={{ mt: 2 }} item xs={12} >
               <Button type="submit" variant="contained">Guardar contraseña</Button>
          </Grid>
          </Grid>
        </center>
         

    


      </Grid>
    </Grid>


        </form>
      )
}
