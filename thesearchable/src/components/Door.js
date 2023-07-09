import React from "react";
import Part from "./part";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
export default function Door(props){
const [doorParts, setDoorParts] = React.useState([])
const [theDisplay, setTheDisplay] = React.useState(false)

React.useEffect(function(){
    props.relatedParts.map(part =>{
      
        fetch('/thepart/' + part.id)
        .then(res => res.json())
        .then(data => {
            let newDoorPart = {
                name: data.name,
                relatedEntries: data.relatedEntries
            }
            setDoorParts(oldArray => [...oldArray, newDoorPart]);
        })
    
    })
}, [])


    const returnedDoorParts = doorParts.map(thepart => {
        return (
            <Part relatedEntries={thepart.relatedEntries} name={thepart.name}/>
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

            <SubMenu style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden'}} defaultOpen={true} label={props.name}>
              {returnedDoorParts}
            </SubMenu>
         
       )
    }

      
}