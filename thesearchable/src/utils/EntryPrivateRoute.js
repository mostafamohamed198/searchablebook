import React, {Suspense, lazy} from "react";
import { useContext } from "react";
// import SingleEntry from "../components/SingleEntry";
import { Navigate} from 'react-router-dom'
import AuthContext from "../authentication/AuthContext";
import { useParams } from "react-router-dom";


const SingleEntry = lazy(() => import('../components/SingleEntry'));

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
                 return user.approved && userApprovedCategories.includes(parseInt(entryCategory)) && userApprovedCountires.includes(parseInt(entryOrigin)) ?  <Suspense fallback={<div>Loading...</div>}><SingleEntry id={params.entryId} /></Suspense> : <Navigate to="/login" />
        }
        else{
            return(
            <Navigate to="/login" />
            )
        }
    }
}

export default EntryPrivateRoute;