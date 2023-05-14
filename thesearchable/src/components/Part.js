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

export default function Part(props){

    const [displayEntry, setDisplayEntry] = React.useState(false)
    
    const entry = props.relatedEntries.map(theentry => {
        const [entryName,setEntryName] = React.useState('')
        const url = `/entry/${theentry}`

        fetch('/entries/' + theentry)
        .then(res => res.json())
        .then(data => {
            setEntryName(data.title)
        })
        return(
            <MenuItem style={{color:'black', textDecorationLine: 'underline',overflow: 'hidden'}}>
           <Link key={theentry} style={{color:'black'}} to={url}>
             {entryName}
             </Link>
       </MenuItem>
        )
    })
    function clickPart(){
        setDisplayEntry(!displayEntry)
    }

    const styles = {
        display: displayEntry ? 'block': 'none'
    }
    const partName = `${props.name}`
    console.log(partName)
    if (props.name[0]== 'v' && props.name[1] == 'o' && props.name[2] == 'i' && props.name[3] == 'd'){
        console.log('equalv')
        return(
            <div>
                {entry}
                </div>
       )
    }
    else{
       return(
            <SubMenu style={{paddingRight:'10px',fontSize:'16px',fontWeight:'700',color:'#087cc4',overflow: 'hidden'}} label={props.name}>
                {entry}
           
            </SubMenu>
       
       )
    }
}
