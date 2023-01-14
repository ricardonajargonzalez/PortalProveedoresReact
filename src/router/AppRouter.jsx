import { Route, Routes } from "react-router-dom"
import { Authroutes } from "../auth/routes/AuthRoutes"
import { PortalRoutes } from "../portal/routes/PortalRoutes"





export const AppRouter = () => {
  return (
   <Routes>
       {/* login */}
       <Route path="/auth/*" element={ <Authroutes /> } />

       {/* App */}
       <Route path="/*" element={ <PortalRoutes /> } />
   </Routes>

  )
}
