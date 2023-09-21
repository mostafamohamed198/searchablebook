import React from "react";
import Part from "./part";
import {  SubMenu,  } from 'react-pro-sidebar';
export default function Door(props){
    const returnedDoorParts = props.relatedParts.map(thepart => {
        return (
            <Part  headingsArray={props.headingsArray} selectedEntryId={props.selectedEntryId} activeEntry={props.activeEntry} chapterClicked={selected => props.chapterClicked(selected)}  relatedEntries={thepart.relatedEntries} name={thepart.name}/>
        )
    })
 
    if (props.name[0]== 'v' && props.name[1] == 'o' && props.name[2] == 'i' && props.name[3] == 'd'){
        return(
               returnedDoorParts
            )
    }
    else{
        return(

            <SubMenu style={{fontSize:'18px',color:'rgb(81, 81, 81)', fontWeight: '500'}} defaultOpen={false} label={props.name}>
              {returnedDoorParts}
            </SubMenu>
         
       )
    }

      
}