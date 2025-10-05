import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"




export const Authroutes = () => {
  return (
   <Routes>
      <Route path="/auth/login/*" element={<LoginPage />} />
      <Route path="/auth/register/*" element={<RegisterPage />} />

      <Route path="/*" element={ <Navigate to="/auth/login" /> } />
   </Routes>
  )
}
