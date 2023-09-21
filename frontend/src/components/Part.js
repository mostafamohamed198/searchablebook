

import React from "react";
import {  SubMenu} from 'react-pro-sidebar';
import Chapter from "./Chapter";
export default function Part(props){
    const entry = props.relatedEntries.map(theentry => {
        return(

            <Chapter headingsArray={props.headingsArray} selectedEntryId={props.selectedEntryId}  chapterClicked={selected => props.chapterClicked(selected)} activeEntry={props.activeEntry}  chapterid = {theentry.id} title= {theentry.title} />
        )
    })
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
            <SubMenu  style={{paddingRight:'25px', fontSize:'18px', color:'rgb(81, 81, 81)',overflow: 'hidden'}} label={props.name}>

               {entry}
           
            </SubMenu>
       
       )
    }
}
