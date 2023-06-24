import { integerPropType } from "@mui/utils";
import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../authentication/AuthContext";
import axios from "axios";
export default function UserEdit(){
    let {user, authTokens} = useContext(AuthContext)
    const [userEdits, setUserEdits] = React.useState({})
    const [categories, setCategories] = React.useState([])
    const [approvedCategoriesId, setapprovedCategoriesId] = React.useState([])
    const [approvedCountriesId, setApprovedCountriesId] = React.useState([])
    const [countries, setCountries] = React.useState([])
    const [isApproved, setIspproved] = React.useState(false)
    const [isAdmin, setIsAdmin] = React.useState(false) 
    const [inputs, setInputs] = React.useState([])
    const params = useParams();
    React.useEffect(function(){
        fetch('/userinfodetails/' + params.id)
        .then(res => res.json())
        .then(data => {
            const newCategories = []
            const newCountries = []
            setUserEdits(data)
            setIspproved(data.approved)
            setIsAdmin(data.is_admin)
         
            data.approvedcategories?.map(category => {
                newCategories.push(category.id)
            })
            data.approvedcountries?.map(country =>{
                newCountries.push(country.id)
            })
            setapprovedCategoriesId(newCategories)
            setApprovedCountriesId(newCountries)
        })
        fetch('/categories/')
        .then(res => res.json())
        .then(data => {
            
            setCategories(data)
        })
        fetch('/countries/')
        .then(res =>res.json())
        .then(data => {
            setCountries(data)
        })

    },[])
    const handleCategoriesChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
        setapprovedCategoriesId(oldArray => [...oldArray,parseInt(value)])
        }
   
        else {
        setapprovedCategoriesId(approvedCategoriesId.filter((e) => e != value))
        }
      };

      const handleCountryChange = (e) => {
        const {value, checked} = e.target;
        if(checked) {
            setApprovedCountriesId(oldArray => [...oldArray,parseInt(value)])
        }
        else {
            setApprovedCountriesId(approvedCountriesId.filter((e) => e != value))
            }
      }

      const handleApprovedChange = (e) => {
        setIspproved(!isApproved) 
      }

      const handleAdminChange = (e) => {
        setIsAdmin(!isAdmin) 
      }
    const approvedCategories = categories.map(category =>{
        if (approvedCategoriesId.includes(category.id)){
           
            return(
                <label>
                <input  type="checkbox" name='theCategories' value={category.id} onChange={handleCategoriesChange} checked={true} />
                {category.thecategory}
                </label>
            )
        }
        else{
            
            return(
                <label>
                <input type="checkbox" name='theCategories' value={category.id} onChange={handleCategoriesChange} checked={false} />
                {category.thecategory}
                </label>
            )
        }
        
    })

    const approvedCountries = countries.map(country =>{
        if (approvedCountriesId.includes(country.id)){
         
            return(
                <label>
                <input type="checkbox" value={country.id} checked={true} onClick={handleCountryChange}/>
                {country.country}
                </label>
            )
        }
        else{
            
            return(
                <label>
                <input type="checkbox" value={country.id} checked={false}  onClick={handleCountryChange} />
                {country.country}
                </label>
            )
        }})

        const handleChange = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({...values, [name]: value}))
          
          }


        const handleSubmit = (event) => {
            event.preventDefault()

            // axios.put(`/userform/`,{
            //     id: params.id,
            //     lastPaid: inputs.lastPaid,
            //     lastDatePayment: inputs.lastDatePayment,
            //     approved: isApproved,
            //     is_admin: isAdmin,
            //     approvedcategories: approvedCategoriesId,
            //     approvedcountries: approvedCountriesId

            // }, {headers: {
            //     'Content-Type': 'multipart/form-data',
            //     'Authorization':'Bearer ' + String(authTokens.access)
            // }})

            fetch(`/userform/`,{
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    id : params.id,
                    lastPaid: inputs.lastPaid,
                    lastDatePayment: inputs.lastDatePayment,
                    approved: isApproved,
                    is_admin: isAdmin,
                    approvedcategories: approvedCategoriesId,
                    approvedcountries: approvedCountriesId
            })
            })
        
            // fetch('/userform/', {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         id: params.id,
            //         lastPaid: inputs.lastPaid,
            //         lastDatePayment: inputs.lastDatePayment,
            //         approved: isApproved,
            //         is_admin: isAdmin,
            //         approvedcategories: approvedCategoriesId,
            //         approvedcountries: approvedCountriesId

            //     })
            // })
         }


    return (
        <div className="container">
            <div> 
                <h2>معلومات عن المستخدم:</h2>
                <p><span>اسم المستخدم:</span>{userEdits.user?.username}</p>
                <p><span> الرقم التعريفي:</span>{userEdits.user?.id}</p>
                <p><span> الإيميل :</span>{userEdits.user?.email}</p>
                <form onSubmit={handleSubmit}>
                    <label>قيمة اخر تحديث :</label>
                        <input type="number" name="lastPaid" value={userEdits.lastPaid} onChange={handleChange} />
                    <label>تاريخ اخر تحديث :</label>
                        <input type="data"name="lastDatePayment" value={userEdits.lastDatePayment} onChange={handleChange} />
                    <div>
                        <label>
                            <input type="checkbox"  checked={isApproved} onChange={handleApprovedChange}   />
                            موافق
                        </label>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox"  checked={isAdmin} onChange={handleAdminChange}  />
                            محرر
                        </label>
                    </div>
                    <div>
                        <h2>الفئات:</h2>
                        {approvedCategories}
                    </div>
                    <div>
                        <h2>الدول:</h2>
                        {approvedCountries}
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>

    )
}