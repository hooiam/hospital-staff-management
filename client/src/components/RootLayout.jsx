import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const isAuthenticated = () => {
  return localStorage.getItem('token') === null ? false : true
}


export default function RootLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/")
  } 

  return (
    <>
      <div className="container">
        { isAuthenticated() && <Nav handler={handleLogout}/> }   
        <Outlet />
      </div>
    </>    
  )
}