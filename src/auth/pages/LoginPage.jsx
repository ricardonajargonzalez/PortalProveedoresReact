import { Link as RouterLink, useFormAction, useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Link, Grid, TextField, Typography, CircularProgress, Box, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { checkingAuthentication } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import logo from '../../assets/img/dex-logo.png'





export const LoginPage = () => {

  const dispatch = useDispatch();
  const { status, isLoading, errorMessage } = useSelector(state => state.auth);
  const isErrorMessage  = useMemo( () => errorMessage != null, [errorMessage] );

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });

  const [animatedError, setanimatedError] = useState('');

  useEffect(() => {
    if(isErrorMessage){
      setanimatedError('animate__animated animate__shakeX')
    } 

  }, [isErrorMessage]);
  

  const isAuthenticating = useMemo(() => status === 'cheking', [status]);
  const isAuthenticated = useMemo(() => status === 'authenticated', [status]);
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(checkingAuthentication(email, password));
    // navigate('/dashboard', {replace: true});
  }

  const onGoogleSignIn = (event) => {
    console.log({ email, password });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated]);



  return (
    <AuthLayout 
    title="PORTAL DE CLIENTES">
        
      <form onSubmit={onSubmit}
      >
        <Grid container>
          <Grid item xs={12} md={12}>
             <Box
             display="flex"
             justifyContent="center"
             alignItems="center"
             minHeight="30px"
             >
                  <img style={{width: '130px'}} src={`${import.meta.env.VITE_URL_BASE}${logo}`} />
            </Box>
          </Grid>
          {/* <Grid item>
          <Typography>Portal de Consulta de Proveedores</Typography>
          </Grid> */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Usuario"
              type="text"
              placeholder="Ingresa usuario"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12} >
              <Button 
                style={{ color: 'white', backgroundColor: '#004479' }}
                disabled={isAuthenticating}
                type="submit" variant="contained" fullWidth >
                { isLoading ? <CircularProgress sx={{color: '#004479'}} size={25} /> : <>INICIAR SESIÓN</> } 
              </Button>
            </Grid>
            {/* <Grid item xs={12} sm={6} >
              <Button
              disabled={true}
                // disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained" fullWidth sx={{ pl: 2, pr: 2, backgroundColor: 'color1.main' }}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid> */}
           {
           errorMessage &&
           <Grid item xs={12}>
               <Alert className={animatedError} severity="error">{errorMessage}</Alert>
            </Grid>
           } 
          </Grid>


        </Grid>
      </form>
    </AuthLayout>
  )
}
