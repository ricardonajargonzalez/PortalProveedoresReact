import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { notifiSlice } from "./notificaciones/notifiSlice";
import { estadoDocumentos } from "./portal/estadoDocumentosSlice";


export const store = configureStore({
    reducer: {
        documentos : estadoDocumentos.reducer,
        auth : authSlice.reducer,
        notifi :notifiSlice.reducer
    },
  })