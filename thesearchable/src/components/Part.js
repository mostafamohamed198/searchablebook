

import React from "react";
import {Route, Link, Router, Routes, useParams} from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import Chapter from "./Chapter";
export default function Part(props){

    const [displayEntry, setDisplayEntry] = React.useState(false)
    
    const entry = props.relatedEntries.map(theentry => {
        const [entryName,setEntryName] = React.useState('')
        const url = `/entry/${theentry.id}`
        // activeEntry={props.activeEntry} tableofContent={props.tableofContent}
       
        return(
    //         <Link key={theentry.id} style={{color:'black'}} to={url}>
    //         <MenuItem style={{color:'black', textDecorationLine: 'underline',overflow: 'hidden'}}>
          
    //          {theentry.title}
            
    //    </MenuItem>
    //    </Link>
    <Chapter activeEntry={props.activeEntry} tableofContent={props.tableofContent} chapterid = {theentry.id} title= {theentry.title} />
        )
    })
    function clickPart(){
        setDisplayEntry(!displayEntry)
    }

    const styles = {
        display: displayEntry ? 'block': 'none'
    }
    const partName = `${props.name}`

    if (props.name[0]== 'v' && props.name[1] == 'o' && props.name[2] == 'i' && props.name[3] == 'd'){

        return(
            <div>
                {entry}
                </div>
       )
    }
    else{
       return(
            // <SubMenu style={{paddingRight:'25px', fontSize:'16px',color:'#087cc4',overflow: 'hidden'}} label={props.name}>
            <SubMenu style={{paddingRight:'25px', fontSize:'16px',color:'#087cc4',overflow: 'hidden'}} label={props.name}>

               {entry}
           
            </SubMenu>
       
       )
    }
}
