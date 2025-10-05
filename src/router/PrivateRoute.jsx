import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



export const PrivateRoute = ({ children }) => {

  const { status } = useSelector( state => state.auth); //authenticated
  const notauthenticated  = useMemo( () => status === 'not-authenticated', [status] );
  const authenticated  = useMemo( () => status === 'authenticated', [status] );
  

   
  if(authenticated){
     return children;
  }else if(notauthenticated){
    return <Navigate to="/login" />;
  }

}
