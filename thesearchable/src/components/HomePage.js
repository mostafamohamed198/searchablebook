import React, { Component } from "react";
import SingleEntry from "./SingleEntry";
import { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import SearchResults from "./SearchResults";
import Author from "./Author";
import UserInfo from "./UserInfo";
import UserEdit from "./UserEdit";
import AuthorForm from "../forms/AuthorForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet
} from "react-router-dom";
import Form from "../forms/Form"
import PDF from "./PDF";
import Category from "./Category";
import Favourites from "./Favourites";
import Users from "./Users";
import BookForm from "../forms/BookForm";
import EntryBookForm from "../forms/EntryBookForm";


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

function favouriteButton(){
  if (authentication){
    return(
      <li>
            <a href="/favourites">المفضلة</a>
            {/* <Link to="/favourites">المفضلة</Link> */}
          </li>
    )
  }
}

function authenticationButtons (){
  if (authentication){
    return(
      <a href="/logout" className="brand-name">
      تسجيل الخروج 
    </a>
    )
  }
  else{
return(
    <div>
      
      <a href="/login" className="brand-name">
        <span>
           تسجيل الدخول.  
         </span>
      </a>

      <a href="/register" className="brand-name">
        <span>
       إنشاء حساب
      </span>
      </a>
    </div>
    )
  }
}
  
    return (

        <div className="container">
            
    
        
            <div className="logoandtitle">
             <a href="/" className="brand-name">
        العنوان واللوجو 
      </a>
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
              <a href="/category/4"><p className="dropdown-element">كتب قانونية</p></a>
              {/* <Link to="/category/4"><p className="dropdown-element">aكتب قانونية</p></Link> */}
              <a href="/category/3"><p className="dropdown-element"> موسوعات</p></a>
            </div>
          </div>
          </li>
    
          <li>
            <a >مجلات قانونية</a>
          </li>

          <li>
          <div className="dropdown">
            <span className="dropdown-title">رسائل</span> <i class="fa-solid fa-angle-down"></i>
            <div className="dropdown-content">
            <a href="/category/1"><p className="dropdown-element">رسائل ماجستير</p></a>
              <a href="/category/2"><p className="dropdown-element"> رسائل دكتوراه</p></a>
            </div>
          </div>
          </li>
          {favouriteButton()}
        </ul>
      </div>

     
        </nav>
      
        <Router>
    
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/entry/:entryId' element={<SingleEntry  />}/>
          <Route path='results/:resultvalue' element={<SearchResults />} />
          <Route path='authordetails/:theauthid' element={<Author />} />
          <Route path='articlepdf/:id' element={<PDF />} />
          <Route path='category/:catid' element={<Category />} />
          <Route path="form" element={<Form />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path='users' element={<Users />}/>
          <Route path="userinfo/:id" element={<UserInfo />} />
          <Route path="useredit/:id" element={<UserEdit />} />
          <Route path="bookform" element={<BookForm />}/>
          <Route path="entrybookform" element={<EntryBookForm />}/>
          <Route path="authorform" element={<AuthorForm />}/>
        </Routes>
     
      </Router>
      
      <Outlet />
      </div >
    );
  }

