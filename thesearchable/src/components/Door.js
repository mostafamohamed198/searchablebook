import React from "react";
import Part from "./part";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
export default function Door(props){
const [doorParts, setDoorParts] = React.useState([])
const [theDisplay, setTheDisplay] = React.useState(false)

React.useEffect(function(){
    props.relatedParts.map(part =>{
        fetch('/thepart/' + part)
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
    function changedisplay(){
        setTheDisplay(!theDisplay)
    }

    const styles = {
        display : theDisplay ? 'block' : 'none'
    }
const name= 'مصطفي'
       return(

            <SubMenu style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden'}}label={props.name}>
              {returnedDoorParts}
            </SubMenu>
         
       )
}