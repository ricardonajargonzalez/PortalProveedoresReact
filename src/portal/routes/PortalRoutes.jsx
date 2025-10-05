import { Navigate, Route, Routes } from "react-router-dom";
import { AccountPage } from "../pages/AccountPage";
import { CambiarContrasenaPage } from "../pages/CambiarContrasenaPage";
import { PortalPage } from "../pages/PortalPage";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { ArticulosHome } from "../views/ArticulosHome";





export const PortalRoutes = () => {


  const { status, cambiarPassword  } = useSelector( state => state.auth); //authenticated
  const notauthenticated  = useMemo( () => status === 'not-authenticated', [status] );
  const authenticated  = useMemo( () => status === 'authenticated', [status] );

 
  if(cambiarPassword == 1 || cambiarPassword == '1' ){


    return (
      <Routes>
          <Route path="/"        element={ <PortalPage> <AccountPage />  </PortalPage> } />
          <Route path="/account" element={ <PortalPage><AccountPage /> </PortalPage> } />
          <Route path="/changepassword" element={ <PortalPage><CambiarContrasenaPage /> </PortalPage> } />
          <Route path="/*" element={ <Navigate to="/dashboard" /> } />
      </Routes>
    )

 }else{

  return (
    <Routes>
        <Route path="/"        element={ <PortalPage> <ArticulosHome />  </PortalPage> } />
        <Route path="/account" element={ <PortalPage><AccountPage /> </PortalPage> } />
        <Route path="/changepassword" element={ <PortalPage><CambiarContrasenaPage /> </PortalPage> } />
        <Route path="/*" element={ <Navigate to="/dashboard" /> } />
    </Routes>
  )

 } 




 




}
