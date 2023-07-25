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
import {faArrowLeft ,faDownload, faPrint, faShare, faStar as fasolidstar } from '@fortawesome/free-solid-svg-icons'
// import {faArrowRight } from '@fortawesome/free-regular-svg-icons' 
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





export default function SingleEntry (props){

    // const params = useParams();
    const [theEntry, setTheEntry] = React.useState()
    const [theSearchedEntry, setTheSearchedEntry] = React.useState()
    const [searched, setSearched] = React.useState(false)
    const [theTitle ,setTheTitle] = React.useState()
    const [theBook, setTheBook] = React.useState()
    const [theBookName, setTheBookName] = React.useState('')
    const [containsParts, setContainsParts] = React.useState(false)
    const [containsDoors, setContainsDoors] = React.useState(false)
    const [parts, setParts] = React.useState([])
    const [doors, setDoors] = React.useState([])
    const [chapters, setChapters] = React.useState([])
    const [value, setValue] = React.useState('');
    const [list, setList] = React.useState([]);
    const [bibilography, setBibilography] = React.useState('')
    const [isOpen, setIsOpen] = React.useState(false);
    const [authors, setAuthors] = React.useState([])
    const [authentication, setAuthentication] = React.useState(false)
    const [requestUser, setRequestUser] = React.useState('')
    const [inFavourites ,setInFavourites] = React.useState(false)
    const [favouriteUsers , setFavouriteUsers] = React.useState([])
    const [headings, setHeadings] = React.useState([]);
    const [largeWindow, setLargeWindow] = React.useState(true)
    const [loaded, setLoaded] = React.useState(false)
    const [entryOrigin , setEntryOrigin] = React.useState(0)
    const [entryCategory, setEntryCategory] = React.useState(0)
    let {user, authTokens} = useContext(AuthContext)
  
     React.useEffect(function(){
       
              
                fetch('/entries/' + props.id)
                // fetch('/entries/' + 4)
                .then(res => res.json())
                .then(data => {
                setTheEntry(`${data.body}`)
                setTheTitle(`${data.title}`)
                setEntryCategory(data.entryCategory)
                setEntryOrigin(data.entryOrigin)
                setBibilography(`${data.bibiliography}`)
                setFavouriteUsers(data.favouriteusers)
                setAuthors(data.entryauthor)
                setLoaded(true)

                }) 
        
                fetch('/thebook/' + props.id)
                .then(res => res.json())
                .then(data => {
                setTheBook(data.id)
                setTheBookName(data.name)
                setContainsDoors(data.containsDoors)
                setContainsParts(data.containsParts)
                setParts(data.relatedParts)
                setDoors(data.relatedDoors)
                setChapters(data.relatedChapters)
      
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



React.useEffect(function () {

  // if (loaded){
  setHeadings([])
  const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? "",
        level: Number(element.tagName.substring(1))
      }
      ));
  setHeadings(elements);
  setLoaded(false)

// }

}, [theEntry])

React.useEffect(function(){
  // setLoaded(false)
    fetch('/entries/' + props.id)
    .then(res => res.json())
    .then(data => {
    setTheEntry(`${data.body}`)
    setTheTitle(`${data.title}`)
    setBibilography(`${data.bibiliography}`)
    setFavouriteUsers(data.favouriteusers)})




}, [props.id])




function theTable (){

  const headingsmap = headings.map((heading, index, elements) => {
    if (heading.text != 'Footnotes'){
    return (
      <a href={`#${heading.id}`}>
         {/* <MenuItem  key={heading.id} style={{ marginRight: `${heading.level - 2}em` }} >{heading.text}</MenuItem> */}
         <MenuItem  key={heading.id} style={{fontSize:'18px', paddingRight: `${30 + (heading.level * 8)}px` , color: 'rgb(81, 81, 81)', }} >{heading.text}</MenuItem>
      </a>
    )
    }

})
    
  return(
  <nav>
      <ul>
        {headingsmap}
      </ul>
    </nav>
  )
}




    const returnedParts = parts.map(thepart => {
        
        return (
            <Part activeEntry={props.id} tableofContent={theTable} relatedEntries={thepart.relatedEntries} name={thepart.name}/>
        )
    })

const returnedDoors =   doors.map(thedoor => {
    return (
        <Door activeEntry={props.id} tableofContent={theTable}  relatedParts={thedoor.relatedParts} name={thedoor.name} id={thedoor.id}/>
    )
})

const returnedChapters = chapters.map(thechapter => {
    return (
        <Chapter activeEntry={props.id} tableofContent={theTable} chapterid = {thechapter.id} title= {thechapter.title} />
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value != '') {
        
      setList(list.concat(value));
      setSearched(true)
    }
    else{
        setSearched(false)
    }
    const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />
        const ccc= reactStringReplace(theEntry, value, (match, i) => (
            `<mark><a href ="#mark-${i + 2}" id="mark-${i}" className="SE--mark--link">${match} <i class="fa-solid fa-arrow-left" className="SE--arrowLeft"></i> </a></mark>`
           ));
     setTheSearchedEntry(ccc.join(""));
    setValue('')
  
  };

  const { collapseSidebar, rtl } = useProSidebar();

  const downloadLink = `/articlepdf/${props.id}`;

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
const componentRef = React.useRef();
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

    axios.put(`/putFavourites/${props.id}`,{
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

 
  const theauthors = authors.map(author =>{
    const redirect = `/authordetails/${author.id}`
    return(
        <Link to={redirect} style={{textDecoration:'none', color:'#087cc4'}}><div className="SE--author">{author.name}</div></Link>
    )
  })

  function collapsedWidth(){
    const windowWidth = React.useRef(window.innerWidth);
    if (windowWidth.current >= 390){
            return(false)  
    }
    else{
  return(true)
    }
  }



 return (
        
    	<div id="SEforpdf" className="SE">


                 <Sidebar toggled={false} defaultCollapsed={collapsedWidth()} rtl={true} style={{ zIndex:0}}>
               
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
         
      <div className="SE--bookName"><Link style={{color: 'black'}} to={`/book/${theBook}`}>{theBookName}</Link></div>
                <div  className="SE--input--div">
                    <form  className="SE--input">
                            <input value={value} onChange={handleChange} type="search" placeholder="ابحث عن كلمة في هذا المستند" />
                            <button onClick={handleSubmit}>Search</button>
                    </form>
                </div>
                <div className="SE--final--returned">
            {finalreturned()}
            </div>
 
        </Menu>
        
   
      </Sidebar>
             
            <div className='SE--markdown'>
                {/* <div>{windowWidth}</div> */}
                <div className="SE--markdown--title">{theTitle}</div>
                <div className="SE--icons">
                <a href={downloadLink} ><FontAwesomeIcon icon={faDownload} /></a>
                <div>
                    <a onClick={openpop}><FontAwesomeIcon icon={faShare} /></a>
                    <ReactModal isOpen={isOpen} contentLabel='Example Modal' style={customStyles} onRequestClose={closeModal}>
                        <Share />
                    </ReactModal>
                </div>
                <div>
      <ReactToPrint
        trigger={() => <a><FontAwesomeIcon icon={faPrint} /></a>}
        content={() => componentRef.current}
      />
          <ComponentToPrint className='SE--printing' ref={componentRef} title={theTitle} content={theEntry} bibilography={bibilography}/>
    </div>
    <a>{iconStar()}</a>
                </div>
                <div className="SE--docInfo--container">
                <div className="SE--document--info">
                <div style={{fontSize:'20px', fontWeight:'700'}}> معلومات عن المقال </div>
                    <div className="SE--document--authors">
                        <div style={{fontSize: '16px',fontWeight:'700', marginLeft:'30px'}}>{authors.length > 1 ? "المؤلفون:" : "المؤلف:"}</div>
                        <div className="SE--authors--div">
                            {theauthors}
                        </div>
                    </div>
                    </div>
                </div>
                
               
                {/* <div  onBlur = {() => setLoaded(!loaded)}> */}
                <ReactMarkdown 
               
              
                components={{
                  h2: ({ node, ...props }) => (
                    <h2 id={`${props.children[0]}`} {...props}></h2>
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 id={`${props.children[0]}`} {...props}></h3>
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 id={`${props.children[0]}`} {...props}></h4>
                  ),
                  h5: ({ node, ...props }) => (
                    <h5 id={`${props.children[0]}`} {...props}></h5>
                  ),
                 h6: ({ node, ...props }) => (
                    <h6 id={`${props.children[0]}`} {...props}></h6>
                  ),
                }} 
         className="SE--markdown--content" rehypePlugins={[rehypeRaw, remarkGfm]} children={searched ? theSearchedEntry : theEntry}  remarkPlugins={[remarkGfm]} />
            {/* </div> */}
            </div>
            {/* </div> */}
            
            {/* {setLoaded(true)} */}

  
        </div>

    )
}

