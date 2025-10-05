import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { Authroutes } from "../auth/routes/AuthRoutes"
import { PortalRoutes } from "../portal/routes/PortalRoutes"
import { logout, validarTokenUserLogged } from "../store/auth"
import { CheckingAuth } from "../ui/components/CheckingAuth"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"





export const AppRouter = () => {


  const { status, isLoading } = useSelector(state => state.auth);
  const isChecking  = useMemo( () => status == 'checking', [status] );
  const isauthenticated  = useMemo( () => status == 'authenticated', [status] );
  const dispatch = useDispatch();



  // const tokenls = localStorage.getItem('token');

useEffect(() => {
    let  tokenls = localStorage.getItem('token');
    let  kill = localStorage.getItem('kill');





    if(!tokenls){
      console.log("no existe token/ cerrar ");
      dispatch(logout({errorMessage: null}));
    }else{
     
      if(!kill){
        console.log("cerrar por kill ");
        localStorage.setItem("kill", 1);
        dispatch(logout({errorMessage: null}));
      }else{
        console.log("ya existe kill ya se cerro sesion");
      }

      console.log("validamos token ");
      //aqui hay que revisar el token si es valido y si es valido y vigente recargamos el usuario
      dispatch(validarTokenUserLogged(tokenls));
    }
},[]);



  if(status == 'checking'){
    return <CheckingAuth />
  }



  return (
    <Routes>

{/* <Route path="/*" element={<Authroutes />} />
<Route path="/dashboard/*" element={<PortalRoutes />} /> */}

      {/* login */}
      <Route path="/*" element={
        <PublicRoute>
          <Authroutes />
        </PublicRoute>
      } />


      {/* App */}
      <Route path="/dashboard/*" element={
        <PrivateRoute>
          <PortalRoutes />
        </PrivateRoute>}
      />




      {/* { (isauthenticated) ?
          <Route path="/*" element={<Authroutes />} />
        :
        <Route path="/dashboard/" element={<PortalRoutes />} />
      } */}


      {/* login */}
      {/* <Route path="/*" element={
        <PublicRoute>
          <Authroutes />
        </PublicRoute>
      } /> */}


      {/* App */}
      {/* <Route path="/dashboard/*" element={
        <PrivateRoute>
          <PortalRoutes />
        </PrivateRoute>}
      /> */}

    </Routes>

  )
}
