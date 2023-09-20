import React from "react";
import Part from "./part";
import {  SubMenu,  } from 'react-pro-sidebar';
export default function Door(props){
const [doorParts, setDoorParts] = React.useState([])
const [theDisplay, setTheDisplay] = React.useState(false)
// console.log(`in door the selected entry id is ${props.selectedEntryId}`)


// console.log(props.chapterClicked)
        
        // function chapterClicked(){
        //     return props.chapterClicked
        // }

        // function tableofContent(){
        //     return props.tableofContent
        // }
    const returnedDoorParts = props.relatedParts.map(thepart => {
        return (
            <Part  headingsArray={props.headingsArray} selectedEntryId={props.selectedEntryId} activeEntry={props.activeEntry} chapterClicked={selected => props.chapterClicked(selected)}  relatedEntries={thepart.relatedEntries} name={thepart.name}/>
        )
    })
 

    // const styles = {
    //     display : theDisplay ? 'block' : 'none'
    // }
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