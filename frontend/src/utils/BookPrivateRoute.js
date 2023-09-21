import React from "react";
import { useContext } from "react";
import SingleBook from "../pages/SingleBook";
import {Route, Redirect, Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";
import { useParams } from "react-router-dom";
const BookPrivateRoute = () => {
    const [loaded, setLoaded] = React.useState(false)
    const [bookOrigin , setBookOrigin] = React.useState(0)
    const [bookCategory, setBookCategory] = React.useState(0)
    let {user} = useContext(AuthContext)
    const params = useParams();
    React.useEffect(function(){
        fetch('/api/thesearchable/bookdetail/' + params.bookId)
        // fetch('/entries/' + 4)
        .then(res => res.json())
        .then(data => {
        setBookCategory(data.bookCategory.id)
        setBookOrigin(data.bookOrigin.id)
        setLoaded(true)
    })
    },[])
   
    if (loaded){
       
        if (user != null){
            const userApprovedCountires = user.approvedcountries
            const userApprovedCategories = user.approvedcategories
                 return user.approved && userApprovedCategories.includes(parseInt(bookCategory)) && userApprovedCountires.includes(parseInt(bookOrigin)) ?  <SingleBook id={params.bookId} /> : <Navigate to="/login" />
        }
        else{
            return(
            <Navigate to="/login" />
            )
        }
    }
}

export default BookPrivateRoute;