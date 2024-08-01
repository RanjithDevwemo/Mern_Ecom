// // components/PrivateRoute.js

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('auth-token');

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;


import React from 'react'
import { Outlet } from 'react-router-dom'
import LoginSignup from '../../Components/LoginSignup/LoginSignup'

const authUser=()=>{
    const user={login:true}
    
    return user && user.login
}

export default function PrivateRoutes() {
    
const isAuth=authUser();
return isAuth ? <Outlet/> : <LoginSignup/>

  
}

