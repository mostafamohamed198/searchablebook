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
  function returnTOC (){
   if (props.activeEntry == props.chapterid){
 
    return (
      // <MenuItem style={{height: '100%'}}>
      // <div style={{height: '100%'}}>
      // {props.tableofContent()}
      // </div>

      //       </MenuItem> 
      props.tableofContent()
    )
   }
  }

    const url = `/entry/${props.chapterid}`
    
       return(
          // <SubMenu label={props.title} style={{fontSize: '16px', paddingRight: '30px', outline: 'none'}} component={<Link to= {url} />}>{returnTOC()}</SubMenu>
          <SubMenu label={props.title} style={{paddingRight: '35px', fontSize: '18px', color:'rgb(81, 81, 81)', fontWeight: props.activeEntry == props.chapterid ? '700' : '500'}} component={<Link to= {url} />}>{returnTOC()}</SubMenu>
       )
}