import { Typography } from "@mui/material"
import { AppLayout } from "../layout/PortalLayout"




export const PortalPage = ({children}) => {
  return (
    <AppLayout>
         {children}
       
    </AppLayout>
  )
}
