import { Navigate, Route, Routes } from "react-router-dom"
import { PortalPage } from "../pages/PortalPage"




export const PortalRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <PortalPage /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
