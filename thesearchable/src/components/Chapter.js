import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
    Outlet
  } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
export default function Chapter(props){
 
    const url = `/entry/${props.chapterid}`
    
       return(
       
        <Link key={props.chapterid} style={{color: 'black'}} to={url}><MenuItem>{props.title}</MenuItem></Link>
        
       )
}