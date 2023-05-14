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
    const[chaptername, setChapterName] = React.useState('')
    fetch('/thechapter/' + props.chapterid)
    .then(res => res.json())
    .then(data =>{ 
 
        setChapterName(data.title)
    })
    const url = `/entry/${props.chapterid}`
    
       return(
        // <Router>
        <MenuItem><Link key={props.chapterid} style={{color: 'black'}} to={url}>{chaptername}</Link></MenuItem>
        // </Router>
        // <MenuItem><a  style={{color: 'black'}} href={url}>{chaptername}</a></MenuItem>
        
       )
}