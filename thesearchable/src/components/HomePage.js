import React, { Component } from "react";
import SingleEntry from "./SingleEntry";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  Routes,
} from "react-router-dom";
import css from '../../static/css/index.css'


export default function HomePage() {

    const [isNavExpanded, setIsNavExpanded] = useState(false)
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
         <a href="/" className="brand-name">
        تسجيل الخروج 
      </a>
      <a href="/" className="brand-name">
        تسجيل الدخول 
      </a>
        <ul>
    
    
          <li>
            <a >رسائل ماجستير</a>
          </li>
          <li>
            <a >مجلات قانونية</a>
          </li>
          <li>
            <a>كتب قانونية و موسوعات</a>
          </li>
        </ul>
      </div>

     
        </nav>
      
      <Router>
        <Routes>
          
          <Route path='/entry/:entryId' element={<SingleEntry  />}/>
        </Routes>
      </Router>
      </div >
    );
  }

