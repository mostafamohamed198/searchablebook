import React from "react";
import { useContext } from "react";
import {Route, Redirect, Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";
import { useParams } from "react-router-dom";
import Category from "../pages/Category";
const CategoryPrivateRoute = () => {
    let {user} = useContext(AuthContext)
    const params = useParams();
    if(user != null){
      const userApprovedCategories = user.approvedcategories

     return  user.approved && userApprovedCategories.includes(parseInt(params.id)) ?  <Category id={params.id} /> : <Navigate to="/login" />
    }
    else{
        return(
            <Navigate to="/login" />
        )
    }
}

export default CategoryPrivateRoute;