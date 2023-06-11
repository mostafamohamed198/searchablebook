import React, { Component } from "react";
import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import SearchResults from "./SearchResults";
import Author from "./Author";
import AdminLinks from "../administration/AdminLinks";
import UserEdit from "./UserEdit";
import UserInfoPrivateRoute from "../utils/UserInfoPrivateRoute";
import AdminPrivateRoute from "../utils/AdminPrivateRoute";
import CategoryPrivateRoute from "../utils/CategoryPrivateRoute";
import LoginPage from "../authentication/LoginPage";
import AuthorForm from "../forms/submitforms/AuthorForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useLocation
} from "react-router-dom";
import EntryPrivateRoute from "../utils/EntryPrivateRoute";
import  AuthContext  from "../authentication/AuthContext";
import PrivateRoute from "../utils/PrivateRoute";
import Form from "../forms/submitforms/Form"

import Favourites from "./Favourites";
import EditLinks from "../administration/EditLinks";
import Users from "./Users";
import FormsPrivateRoute from "../utils/FormsPrivateRoute";
import FormEdit from "../forms/editForms/formedit";
import BookForm from "../forms/submitforms/BookForm";
import EntryBookForm from "../forms/submitforms/EntryBookForm";
import BookEditForm from "../forms/editForms/BookEditForm";
import AuthorEditForm from "../forms/editForms/AuthorEditForm";
export default function HomePage() {

   const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [authentication, setAuthentication] = React.useState(false)
React.useEffect(function(){
  fetch('/authentication_state' )
  .then(res => res.json())
  .then(data => {
    setAuthentication(data.authentication)     
  })
},[])
let {user, logoutUser} = React.useContext(AuthContext)
const location = useLocation();

function favouriteButton(){
  if (user){
    return(
      <li>
            <Link to="/favourites">المفضلة</Link>
            {/* <Link to="/favourites">المفضلة</Link> */}
          </li>
    )
  }
}
// let {user, logoutUser} = useContext(AuthContext)

function authenticationButtons (){
  
  if (user){
    return(
      // <p className="brand-name" >Logout</p>

      <p className="brand-name" onClick={logoutUser}>تسجيل الخروج</p>

    )
  }
  else{
return(
    <div>
      

      <Link to="/login"className='brand-name' > تسجيل الدخول.</Link>

      <a href="/register" className="brand-name">
        <span>
       إنشاء حساب
      </span>
      </a>
    </div>
    )
  }
}
const requiresAuthentication = location.pathname !== "/login";

    return (

        <div className="container">    
            <div className="logoandtitle">
             <Link to="/" className="brand-name">
        العنوان واللوجو 
      </Link>
      </div>
            <nav className="navigation">
            <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
                <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
          </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <div>{authenticationButtons()}</div>
        
      
        <ul>
        <li>
        <div className="dropdown">
            <span className="dropdown-title"> كتب قانونية و موسوعات</span> <i class="fa-solid fa-angle-down"></i>
            <div className="dropdown-content">
              <Link to="/category/1"><p className="dropdown-element">كتب قانونية</p></Link>

              <Link to="/category/2"><p className="dropdown-element"> موسوعات</p></Link>
            </div>
          </div>
          </li>
    
          <li>
            <Link to="/category/4">مجلات قانونية</Link>
          </li>

          <li>
          <div className="dropdown">
            <span className="dropdown-title">رسائل</span> <i class="fa-solid fa-angle-down"></i>
            <div className="dropdown-content">
            <Link to="/category/5"><p className="dropdown-element">رسائل ماجستير</p></Link>
              <Link to="/category/3"><p className="dropdown-element"> رسائل دكتوراه</p></Link>
            </div>
          </div>
          </li>
          {favouriteButton()}
        </ul>
      </div>

     
        </nav>

        <Routes> 
            <Route exact  element={<PrivateRoute/>}>
                <Route path='results/:resultvalue' element={<SearchResults />} />
                <Route path='authordetails/:theauthid' element={<Author />} />
                <Route path="favourites" element={<Favourites />} />
            </Route> 
            <Route path='/entry/:entryId' element={<EntryPrivateRoute  />}/>
            <Route  path="/" element={<LandingPage />} />
            <Route  path="/login" element={<LoginPage />} />
            <Route path='category/:id' element={<CategoryPrivateRoute />} />
            
            <Route exact  element={<AdminPrivateRoute/>}>
                <Route path='users' element={<Users />}/>
                <Route path="useredit/:id" element={<UserEdit />} />
                <Route path="adminPageLinks" element={<AdminLinks />} />
            </Route>
            <Route exact  element={<FormsPrivateRoute />}>
                <Route path="bookform" element={<BookForm />}/>
                <Route path="entrybookform" element={<EntryBookForm />}/>
                <Route path="authorform" element={<AuthorForm />}/>
                <Route path="form" element={<Form />} />
                <Route path="editbook/:id" element={<BookEditForm />} />
                <Route path="editauthor/:id" element={<AuthorEditForm />}/>
                <Route path="editform/:id" element={<FormEdit />} />
                <Route path="editPageLinks" element={<EditLinks />} />
            </Route>
            <Route path="userinfo/:id" element={<UserInfoPrivateRoute />} />


            
        </Routes>
    
      </div >
    );
  }


