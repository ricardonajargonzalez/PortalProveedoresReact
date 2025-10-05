import { backEndApi } from "../../api/BackEndApi";
import { backEndApiMA } from "../../api/BackEndApiMasAdmin";
import { cambioPassword, cambioPasswordError, checkingCredentials, isLoadingChangepassword, isLoadingregisterUser, login, logout, registerUser } from "./estadoAuthSlice";
import axios from "axios";



export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
      dispatch(checkingCredentials());
  
      try {
        const token = localStorage.getItem('token'); // Obtén el token de localStorage
        const response = await backEndApi.post('/auth/', { username: email, password: password }, {
          headers: {
            'Authorization': `${import.meta.env.VITE_API_KEY_DEX}`, 'Content-Type': 'application/json'
          }
        });
  
        const { status } = response.data;
  
        if (status === false) {
          dispatch(logout({ errorMessage: "Algo salió mal" }));
        } else {
         

          const { accessToken, rfc, user } = response.data;
          const {id, nombre, es_proveedor, id_proveedor, nombre_proveedor } = user;

           console.log(id_proveedor);

          dispatch(login({
            id: id,
            email: nombre,
            proveedor: nombre_proveedor, // aqui podria ir el nombre del proveedor
            rfc: nombre,
            token: accessToken,
            isadmin: 1, //CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAARR
            proveedorId: id_proveedor,
            cambiarPassword: 0
          }));
          
        }
      } catch (error) {
        dispatch(logout({ errorMessage: "Usuario y/o contraseña incorrectos" }));
      }
    }
  }








export const validarTokenUserLogged = (token) =>{
    return async( dispatch ) =>{

        // const { data } = await backEndApi.post('/login/autorizar_token/'));

        try {
        dispatch( checkingCredentials() );


        //llamado al backend - asyncrono
        const response = await backEndApi.post('/validarAccessToken', {token: token}, {
            headers: {
              'Authorization': `${token}`, 'Content-Type': 'application/json'
            }
        });

       

        const { status } = response.data;

        if (status === false) {

            const { error } = response.data;
            dispatch(logout({ errorMessage: error }));

          } else {

            const { accessToken, rfc, user } = response.data;
            const {id, nombre, es_proveedor, id_proveedor, nombre_proveedor } = user;

            dispatch(login({
                id: id,
                email: nombre,
                proveedor: nombre_proveedor, // aqui podria ir el nombre del proveedor
                rfc: nombre,
                token: accessToken,
                isadmin: 1, //CAMBIAAAAAAAAAAAAAAAAAAAAAAAAAAARR
                proveedorId: id_proveedor,
                cambiarPassword: 0
              }));

        }


       } catch (error) {

            if (error.response) {
                
                const { error: errorMessage } = error.response.data; 
                dispatch(logout({ errorMessage: errorMessage  }));
             

            } else if (error.request) {
 
                dispatch(logout({ errorMessage: 'No se recibió respuesta del servidor' }));
            } else {

                dispatch(logout({ errorMessage: 'Error al configurar la solicitud' }));
            }

          
       }

    }
}


export const registrarUsuario = (rfc, email, uuid, password1, password2) =>{
    return async( dispatch ) =>{
    
       
        dispatch( isLoadingregisterUser() );

        //llamado al backend - asyncrono
        const resultado = await backEndApi.post('/login/register',{rfc, email, uuid, password: password1, password2})
        .then(function (response) {
            const { ok, msg } = response.data;
            console.log(msg);
            if(ok===true){
                dispatch(registerUser({errorMessage: null}) );
                dispatch(checkingAuthentication(rfc, password1));
            }else{
                dispatch(registerUser({errorMessage: msg}) );
                
            }

        })
        .catch(function (error) {

            console.log("error al registrar");

        })


        

    }
}


export const cambiarPassword = (rfc,passa, passn, email) =>{
    return async( dispatch ) =>{
    
       
        dispatch( isLoadingChangepassword() );

        //llamado al backend - asyncrono
        const resultado = await backEndApi.post('/login/changepassword',{rfc, passa, passn, email,dominio: import.meta.env.VITE_DOMINIO})
        .then(function (response) {
            const { ok, msg } = response.data;
            if(ok===true){
                dispatch(cambioPassword({Message: msg}) );
            }else{
                dispatch(cambioPasswordError({errorMessage: msg}) );
            }

        })
        .catch(function (error) {

            console.log("error al registrar");

        })


        

    }
}