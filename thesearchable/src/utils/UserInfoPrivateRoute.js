import React from "react";
import { useContext } from "react";
import UserInfo from "../components/UserInfo";
import {Route, Redirect, Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";
import { useParams } from "react-router-dom";
const UserInfoPrivateRoute = () => {
     let {user} = useContext(AuthContext)
    const params = useParams();
   
    
 
        if (user != null){
            if(user.superuser){
                return(
                    <UserInfo id={params.id} />
                )
            }
            else if (user.is_admin && parseInt(user.user_id) == parseInt(params.id)){
                return(
                    <UserInfo id={params.id} /> 
                )
            }
            else{
                return(
                <Navigate to="/login" />
                )
            }
             }
        else{
            return(
            <Navigate to="/login" />
            )
        }
    }


export default UserInfoPrivateRoute;