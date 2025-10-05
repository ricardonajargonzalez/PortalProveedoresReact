import { backEndApi } from "../../api/BackEndApi";
import { reducerDocumentos, reducerStartDocumentos } from "./estadoDocumentosSlice";
import dayjs from 'dayjs';



export const cargarTickets = () =>{
  return async( dispatch ) =>{
  
     
      //llamado al backend - asyncrono
      const resultado = await backEndApi.post('tickets/')
      .then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
          console.log("error en api admin total");
      })


  }
}


export const cargarDocumentos = () => {


  return async (dispatch) =>{

     dispatch(  reducerStartDocumentos() );
     backEndApi.get(`/documentos/`)
     .then(res => {
       const documentos = res.data.Items;
       let rows = [];
       let dataitem = {};
       documentos.map((item, index) => {
         let documentoitem = documentos[index].Fields
         let dwdocid;
         let uuid;
         let factura;
         let folio;
         let total;
         let status;
         let oc;
         let rz;
         let fecha;
         let empresa;
        let mes;
        let opinion_sat; //OPINION_POSITIVA_SAT
        let no_adeudo; //NO_ADEUDO_SS
        let adeudo_infonavit; //NO_ADEUDO_INFONAVIT
        let acuse_dyp ; //ACUSE_DYP
        let recibo_Acuse_dyp; //RECIBO_ACUSE_DYP
        let repse; //REPSE
        let recibo_nomina_trabajadores;//RECIBO_NOMINA_TRABAJADORES
        let sua_imss; //SUA_IMSS
        let sipare_imss; //SIPARE_IMSS
        let sua_desglose; //SUA_DESGLOSE
        let pago_infonavit; //PAGO_INFONAVIT
        let comentarios; //COMENTARIOS
         documentoitem.map((document, i) => {

              
          if (document.FieldName === 'DWDOCID') {
            dwdocid = document.Item;
          }

          if (document.FieldName === 'MES') {
            mes = document.Item;
          }
          if (document.FieldName === 'OPINION_POSITIVA_SAT') {
            opinion_sat = document.Item;
          }
          if (document.FieldName === 'NO_ADEUDO_SS') {
            no_adeudo = document.Item;
          }
          if (document.FieldName === 'NO_ADEUDO_INFONAVIT') {
            adeudo_infonavit = document.Item;
          }
          if (document.FieldName === 'ACUSE_DYP') {
            acuse_dyp = document.Item;
          }
          if (document.FieldName === 'RECIBO_ACUSE_DYP') {
            recibo_Acuse_dyp = document.Item;
          }
          if (document.FieldName === 'REPSE') {
            repse = document.Item;
          }
          if (document.FieldName === 'RECIBO_NOMINA_TRABAJADORES') {
            recibo_nomina_trabajadores = document.Item;
          }
          if (document.FieldName === 'SUA_IMSS') {
            sua_imss = document.Item;
          }
          if (document.FieldName === 'SIPARE_IMSS') {
            sipare_imss = document.Item;
          }
          if (document.FieldName === 'SUA_DESGLOSE') {
            sua_desglose = document.Item;
          }
          if (document.FieldName === 'PAGO_INFONAVIT') {
            pago_infonavit = document.Item;
          }
          if (document.FieldName === 'COMENTARIOS') {
            comentarios = document.Item;
          }

          if (document.FieldName === 'PROVEEDOR') { 
            empresa = document.Item;
          }

         });
         dataitem = {
          id: index,
          dwdocid: dwdocid,
          empresa : empresa,
          mes : mes,
          opinion_sat : opinion_sat,
          no_adeudo : no_adeudo,
          adeudo_infonavit : adeudo_infonavit,
          acuse_dyp : acuse_dyp,
          recibo_Acuse_dyp : recibo_Acuse_dyp,
          repse : repse,
          recibo_nomina_trabajadores : recibo_nomina_trabajadores,
          sua_imss : sua_imss,
          sipare_imss : sipare_imss,
          sua_desglose : sua_desglose,
          pago_infonavit : pago_infonavit,
          comentarios : comentarios
        };
        rows.push(dataitem);

       });

        dispatch( reducerDocumentos({
             documentos: rows
        }));

     })

  }
}
