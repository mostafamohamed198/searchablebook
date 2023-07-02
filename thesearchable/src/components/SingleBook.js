import React, { Component, useRef }from "react";
import { useState } from "react";	
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useContext } from "react";
import AuthContext from "../authentication/AuthContext";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import Part from "./part";
import Door from "./Door";
import Chapter from "./Chapter";
import Share from "./Share";
import rehypeRaw from "rehype-raw";
import reactStringReplace from 'react-string-replace';
import { ComponentToPrint } from "./ComponentToPrint";
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPrint, faShare, faStar as fasolidstar } from '@fortawesome/free-solid-svg-icons' 
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee as fasrFaCoffee } from '@fortawesome/sharp-regular-svg-icons'import reactStringReplace from 'react-string-replace';
import Popup from 'reactjs-popup';
import { ProSidebarProvider } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import ReactModal from 'react-modal';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import axios from "axios";
import LoginPage from "../authentication/LoginPage";
import { Login } from "@mui/icons-material";


export default function SingleBook (props){

    const [bookPublisher, setBookPublisher] = React.useState('')
    const [bookPubDate, setBookPubDate] = React.useState('')

    const [theBook, setTheBook] = React.useState()
    const [theBookName, setTheBookName] = React.useState('')
    const [containsParts, setContainsParts] = React.useState(false)
    const [containsDoors, setContainsDoors] = React.useState(false)
    const [parts, setParts] = React.useState([])
    const [doors, setDoors] = React.useState([])
    const [chapters, setChapters] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false);
    const [authors, setAuthors] = React.useState([])
 
    const [requestUser, setRequestUser] = React.useState('')
    const [inFavourites ,setInFavourites] = React.useState(false)
    const [favouriteUsers , setFavouriteUsers] = React.useState([])
  
    const [bookCover, setBookCover] = React.useState('')

    const [isbn, setIsbn] = React.useState('')
    let {user, authTokens} = useContext(AuthContext)
  
     React.useEffect(function(){
       
        
        
                fetch('/bookdetail/' + props.id)
                .then(res => res.json())
                .then(data => {
                setTheBook(data.id)
                setTheBookName(data.name)
                setContainsDoors(data.containsDoors)
                setContainsParts(data.containsParts)
                setParts(data.relatedParts)
                setDoors(data.relatedDoors)
                setChapters(data.relatedChapters)
                setAuthors(data.author)
                setBookPublisher(data.publisher)
                setBookPubDate(data.publicationDate)
                setFavouriteUsers(data.favouriteusers)
                setBookCover(data.cover)
                setIsbn(data.isbn)
           
               }) 
               
               
             }
             ,[])

             React.useEffect(()=>{
                const fetchData = async () =>{
                    setInFavourites(false)
                        favouriteUsers.map(theuser =>{
                            if(theuser == user.user_id) { setInFavourites(true) }
                        })
                    
                }
                fetchData()
                
             },[requestUser, favouriteUsers, props.id])
       

    const returnedParts = parts.map(thepart => {
        
        return (
            <Part relatedEntries={thepart.relatedEntries} name={thepart.name}/>
        )
    })

const returnedDoors =   doors.map(thedoor => {
    return (
        <Door relatedParts={thedoor.relatedParts} name={thedoor.name} id={thedoor.id}/>
    )
})

const returnedChapters = chapters.map(thechapter => {
    return (
        <Chapter chapterid = {thechapter.id} title= {thechapter.title} />
    )
})

function finalreturned(){
    if(containsDoors && containsParts){
        return(returnedDoors)
    }
    else if (!containsDoors && containsParts){
    
        return(returnedParts)
    }
    else {
        return(returnedChapters)
    }
}

const handleChange = (event) => {
    setValue(event.target.value);
  };


  const { collapseSidebar, rtl } = useProSidebar();

  function openpop (){
    setIsOpen(true)
}
function closeModal() {
    setIsOpen(false);
  }

  

  
const customStyles = {
    content: {
      height:'200px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'400px',
      zIndex: 300,
      padding: '0'
    },
  };



function changeFavourites(){
    setInFavourites(!inFavourites);

    axios.put(`/putBookFavourites/${props.id}`,{
        'fav' : inFavourites
    }, {headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization':'Bearer ' + String(authTokens.access)
    }})
}

function iconStar(){
    if (inFavourites){
        return(
            <i onClick={changeFavourites} class="fa-regular fa-star"></i>
        )
    }
    else{
        return(
            <i onClick={changeFavourites} class="fa-solid fa-star"></i>
        )
    }
}
  




function theBookAuthors(){
    
       const allAuthors = authors.map(author => {
        return (
           <Link to={`/authordetails/${author.value}`}>{author.label}</Link> 
        )
        

        })
        if (authors.length > 1){
        return(
            <tr>
                <td className="SB--table--title">المؤلفون:</td>
                <td>{allAuthors}</td>
            </tr>
        )
    }

    else{
        return (
        <tr>
            <td className="SB--table--title">المؤلف:</td>
            <td>{allAuthors}</td>
        </tr>
        )
    }
}
function collapsedWidth(){
    const windowWidth = React.useRef(window.innerWidth);
    if (windowWidth.current >= 390){
            return(
              false
            )
    }
    else{
            return(
              true
            )
    }
   
  }



 return (
   
    <div id="SEforpdf" className="SE">
                 <Sidebar toggled={false} defaultCollapsed={collapsedWidth()} rtl={true} style={{  zIndex:0}}>
                 {/* <Sidebar toggled={false}  rtl={true} style={{  zIndex:0}}> */}
      
<Menu>
       <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
         
          </MenuItem>
          <div className="SE--final--returned">
            {finalreturned()}
            </div>
 
        </Menu>
        
   
      </Sidebar>
             <div className="SB--content--div">
                <div className="SB--Book--Name">{theBookName}    </div>

                <div className="SE--icons">
                <a >{iconStar()}</a>
                <div>
                    <a onClick={openpop}><FontAwesomeIcon icon={faShare} /></a>
                    <ReactModal isOpen={isOpen} contentLabel='Example Modal' style={customStyles} onRequestClose={closeModal}>
                        <Share />
                    </ReactModal>
                </div>
                </div>
                <div className="SB--Book--info">
            <div className="SB--Book--image--div">
                <img className="SB--Book--image" src={bookCover} />
            </div>
            <div className="SB--Book--table--div">
            <table className="SB--Book--table">
                <th colSpan={2}>
                    <td>معلومات عن المنشور: </td>
                </th>
                {theBookAuthors()}
                <tr>
                    <td className="SB--table--title">تاريخ النشر:</td>
                    <td>{bookPubDate}</td>
                </tr>
               
                {bookPublisher != '' && <tr>
                    <td className="SB--table--title">الناشر:</td>
                    <td>{bookPublisher}</td>
                </tr>}

                {isbn != '' && <tr>
                    <td className="SB--table--title">رقم الكتاب المعياري الدولي:</td>
                    <td>{isbn}</td>
                </tr>}
                
            </table>
            </div>
            </div>
            </div>
        </div>     
    	

    )
        }