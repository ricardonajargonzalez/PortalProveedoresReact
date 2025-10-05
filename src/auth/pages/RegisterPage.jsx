
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Button, CircularProgress, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { registrarUsuario } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";


export const RegisterPage = () => {
  const { isLoadingRegister, status, isLoading, errorMessage } = useSelector(state => state.auth);
  const isAuthenticated = useMemo(() => status === 'authenticated', [status]);
  const isRegistering = useMemo(() => isLoadingRegister === true, [isLoadingRegister]);
  const isErrorMessage  = useMemo( () => errorMessage != null, [errorMessage] );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [animatedError, setanimatedError] = useState('');

  useEffect(() => {
    if(isErrorMessage){
      setanimatedError('animate__animated animate__shakeX')
    } 

  }, [isErrorMessage]);

  const { rfc, email, uuid, password1, password2, onInputChange } = useForm({
    rfc: '', 
    email: '', 
    uuid: '', 
    password1: '', 
    password2: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated]);

  const onSubmit = (event) =>{
      event.preventDefault();

      let valido = 1;
      let messages = [];


  
      //password iguales
      if(password1!='' && password2!=''){
        if(password1!=password2){
          messages.push("las contraseñas no son iguales");
          valido = 0;
        }
      }else{
        messages.push("Ingrese contraseña");
        valido = 0;
      }

      //rfc vacio
      if(rfc==''){
        messages.push("Ingrese el RFC");
        valido = 0;
      }

      //email vacio
      if(email==''){
        messages.push("Ingrese correo electronico");
          valido = 0;
       }

    //   //uuid
    //   if(uuid==''){
    //     messages.push("Para completar el registro es necesario un UUID de una factura reciente");
    //     valido = 0;
    //  }
      
     if(messages.length>0){
        alert(JSON.stringify(messages));
     }else{
        dispatch(registrarUsuario( rfc, email, uuid, password1, password2 ));
     }
     
  }



  return (
    <AuthLayout title="Crear cuenta">
    <form onSubmit={onSubmit}>
     <Grid container>

       <Grid item xs={ 12 } sx={{ mt: 2 }}>
         <TextField 
         label="RFC"
         type="text"
         name="rfc"
         placeholder="RFC"
         fullWidth
         onChange={onInputChange}
         />
       </Grid>

       <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Correo electronico"
              type="email"
              name="email"
              placeholder="Ingresa tu correo"
              fullWidth
              onChange={onInputChange}
              />
        </Grid>

       {/* <Grid item xs={ 12 } sx={{ mt: 2 }}>
         <TextField 
         label="UUID de una factura reciente"
         type="text"
         name="uuid"
         placeholder="UUID de una factura reciente"
         fullWidth
         onChange={onInputChange}
         />
       </Grid> */}

       <Grid item xs={ 12 } sx={{ mt: 2 }}>
         <TextField 
         label="Contraseña"
         type="password"
         name="password1"
         placeholder="Contraseña"
         fullWidth
         onChange={onInputChange}
         />
       </Grid>



        <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
              label="Confirmar contraseña"
              type="password"
              name="password2"
              placeholder="Confirmar contraseña"
              fullWidth
              onChange={onInputChange}
              />
        </Grid>

        {
           errorMessage &&
           <Grid item xs={12} sx={{pt:2}}>
               <Alert className={animatedError} severity="error">{errorMessage}</Alert>
            </Grid>
      } 

       <Grid container spacing={ 2 } sx={{ mb: 2,mt: 1 }}>
           <Grid item xs={ 12 } >
             <Button type="submit" variant="contained" 
                 disabled={isRegistering} fullWidth >
                { isLoading ? <CircularProgress sx={{color: '#ffffff'}} size={25} /> : <>Crear Cuenta</> } 
             </Button>
           </Grid>
       </Grid>

       <Grid container direction="row" justifyContent="end">
        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
         <Link component={ RouterLink } color="primary.main" to="/auth/login">
           Ingresar
         </Link>
       </Grid>

     </Grid>
   </form>
</AuthLayout>
  )
}
