import React from "react";
import { useContext } from "react";
import SingleEntry from "../components/SingleEntry";
import {Route, Redirect, Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";
import { useParams } from "react-router-dom";
const EntryPrivateRoute = () => {
    const [loaded, setLoaded] = React.useState(false)
    const [entryOrigin , setEntryOrigin] = React.useState(0)
    const [entryCategory, setEntryCategory] = React.useState(0)
    let {user} = useContext(AuthContext)
    const params = useParams();
    React.useEffect(function(){
        fetch('/entries/' + params.entryId)
        // fetch('/entries/' + 4)
        .then(res => res.json())
        .then(data => {
        setEntryCategory(data.entryCategory)
        setEntryOrigin(data.entryOrigin)
        setLoaded(true)
    })
    },[])
   
    if (loaded){
       
        if (user != null){
            const userApprovedCountires = user.approvedcountries
            const userApprovedCategories = user.approvedcategories
                 return user.approved && userApprovedCategories.includes(parseInt(entryCategory)) && userApprovedCountires.includes(parseInt(entryOrigin)) ?  <SingleEntry id={params.entryId} /> : <Navigate to="/login" />
        }
        else{
            return(
            <Navigate to="/login" />
            )
        }
    }
}

export default EntryPrivateRoute;