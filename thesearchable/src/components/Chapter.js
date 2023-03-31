import React from "react";
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
        <MenuItem><a style={{color: 'black'}} href={url}>{chaptername}</a></MenuItem>
       )
}