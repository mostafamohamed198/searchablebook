
import React from "react";
import { useContext } from "react";
import {Route, Redirect, Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";

const PrivateRoute = ({children, ...rest}) => {
   
    let {user} = useContext(AuthContext)
  
    if (user == null){
        return(
            <Navigate to="/login" />
        )
    }
    else{
    return !user.approved ? <Navigate to="/login" /> : <Outlet />
    }
}

export default PrivateRoute;