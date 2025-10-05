import { backEndApi } from "../../api/BackEndApi";
import axios from "axios";
import { reduceCountnotificaciones, reduceStartNotifications } from "./notifiSlice";



export const cargarNotificaciones = (rfc) =>{
    return async( dispatch ) =>{
    
       
        dispatch( reduceStartNotifications() );
        //llamado al backend - asyncrono
        const resultado = await backEndApi.post('/notificaciones/all',{rfc: rfc})
        .then(function (response) {
            // console.log(response.data)
            const { count, results } = response.data;
            // console.log(JSON.parse(results[0]['descripcion']));

                        if(count>0) return dispatch( reduceCountnotificaciones({count: count, notificaciones: results}) );
            //             dispatch( login({
            //                 id: id,
            //                 email: email,
            //                 empresa: empresa,
            //                 rfc: rfc,
            //                 token: token
            //             }) )
        })
        .catch(function (error) {
            // dispatch( logout({
            //     errorMessage: "Usuario y/o contraseña incorrectos"
            // }) );
        })


        

    }
}
