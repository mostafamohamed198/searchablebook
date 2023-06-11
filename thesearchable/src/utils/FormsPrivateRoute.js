import React from "react";
import { useContext } from "react";
import {Route, Redirect, Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";

const FormsPrivateRoute = ({children, ...rest}) => {
   
    let {user} = useContext(AuthContext)
    if (user == null){
        return(
            <Navigate to="/login" />
        )
    }
    else{
    return user.superuser || user.is_admin ?  <Outlet /> : <Navigate to="/login" />
    }
}

export default FormsPrivateRoute;