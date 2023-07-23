import React from "react";
import Part from "./part";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
export default function Door(props){
const [doorParts, setDoorParts] = React.useState([])
const [theDisplay, setTheDisplay] = React.useState(false)




    const returnedDoorParts = props.relatedParts.map(thepart => {
        return (
            <Part activeEntry={props.activeEntry} tableofContent={props.tableofContent}  relatedEntries={thepart.relatedEntries} name={thepart.name}/>
        )
    })
 

    const styles = {
        display : theDisplay ? 'block' : 'none'
    }
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