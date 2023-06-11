import React from "react";
import { useContext } from "react";
import {Route, Redirect, Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";

const AdminPrivateRoute = ({children, ...rest}) => {
   
    let {user} = useContext(AuthContext)
    if (user == null){
        return(
            <Navigate to="/login" />
        )
    }
    else{
    return !user.superuser ? <Navigate to="/login" /> : <Outlet />
    }
}

export default AdminPrivateRoute;