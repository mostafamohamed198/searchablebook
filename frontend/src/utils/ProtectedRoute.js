import { Navigate } from "react-router-dom";
import AuthContext from "../authentication/AuthContext";
import React from "react";
import { useContext } from "react";
export default function ProtectedRoute({children}){
    let {user} = useContext(AuthContext)
    if(!user){
        return <Navigate to="/" />

    }
    return children
}