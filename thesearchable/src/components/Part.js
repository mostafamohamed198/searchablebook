// import React from "react";
// import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
// export default function Part(props){
//     const [displayEntry, setDisplayEntry] = React.useState(false)
//     const entry = props.relatedEntries.map(theentry => {
//         return(
//             <div>{theentry}</div>
//         )
//     })
//     function clickPart(){
//         setDisplayEntry(!displayEntry)
//     }

//     const styles = {
//         display: displayEntry ? 'block': 'none'
//     }
 
//        return(
//         <div >
//             <div className="Part--name" onClick={clickPart} >{props.name}</div>
//             <div className="Part--entry" style={styles}>{entry}</div>
//         </div>
//        )
// }

import React from "react";
import {Route, Link, Router, Routes, useParams} from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import SingleEntry from "./SingleEntry";
export default function Part(props){

    const [displayEntry, setDisplayEntry] = React.useState(false)
    
    const entry = props.relatedEntries.map(theentry => {
        const [entryName,setEntryName] = React.useState('')
        const url = `/entry/${theentry}`
        console.log(url)
        fetch('/entries/' + theentry)
        .then(res => res.json())
        .then(data => {
            setEntryName(data.title)
        })
        return(
            <MenuItem style={{color:'black', textDecorationLine: 'underline',overflow: 'hidden'}}>
           <a style={{color:'black'}} href={url}>
             {entryName}
             </a>
       </MenuItem>
        )
    })
    function clickPart(){
        setDisplayEntry(!displayEntry)
    }

    const styles = {
        display: displayEntry ? 'block': 'none'
    }

 
       return(
            <SubMenu style={{fontSize:'16px',fontWeight:'700',color:'red',overflow: 'hidden'}} label={props.name}>
                {entry}
            </SubMenu>
       )
}
