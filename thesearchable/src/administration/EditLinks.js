import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Outlet
  } from "react-router-dom";
  import AuthContext from "../authentication/AuthContext";
  import { useContext } from "react";
export default function EditLinks(){
    let {user} = useContext(AuthContext)
    const usersUrl = `/userinfo/${user.user_id}`
    const formUrl = `/form/`
    const bookUrl = `/bookform/`
    const entryBookUrl = `/entrybookform/`
    const authorUrl = `/authorform/`
    return (
        <div style={{margin: '20px'}}>
            <h1>إدارة الموقع </h1>
            <h3>
                <Link key={1}  to={usersUrl}>
                    معلوماتك:
                </Link>
            </h3>
            <h3>
                <Link key={2} to={formUrl}>إضافة مقال</Link>
            </h3>
            <h3>
                <Link key={3} to={bookUrl}>إضافة كتاب</Link>
            </h3>
            <h3>
                <Link key={4} to={entryBookUrl}>محتوي متعلق بكتاب</Link>
            
            </h3> 
            <h3>
                <Link key={5} to={authorUrl}>إضافة مؤلف</Link>
            </h3>  
             
            
        </div>
    )
}