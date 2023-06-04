import React, { Component, useRef }from "react";
import { useState } from "react";	
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
import PDF from "./PDF";





export default function SingleEntry (props){
    const params = useParams();
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
    const [largeWindow, setLargeWindow] = React.useState(true)
React.useEffect(function(){
   fetch('/authentication_state' )
        .then(res => res.json())
        .then(data => {
          setAuthentication(data.authentication)
          setRequestUser(data.userid) 
        }) 
   
      
        fetch('/entries/' + params.entryId)
        // fetch('/entries/' + 4)
        .then(res => res.json())
        .then(data => {
        setTheEntry(`${data.body}`)
        setTheTitle(`${data.title}`)
        setBibilography(`${data.bibiliography}`)
        setFavouriteUsers(data.favouriteusers)
      
    
      
        data.entryauthor.map(author => {
            fetch('/author/' + author)
            .then(res => res.json())
            .then(data => {
                const newData = {
                    'id': data.id,
                    'name': data.name
                }
            
                setAuthors(oldArray => [...oldArray, newData]);
            })
        })
        }) 

        fetch('/thebook/' + params.entryId)
        .then(res => res.json())
        .then(data => {
        setTheBook(data.id)
        setTheBookName(data.name)
        setContainsDoors(data.containsDoors)
        setContainsParts(data.containsParts)
        if (data.containsParts && !data.containsDoors){
          
            data.relatedParts.map(part =>{
                fetch('/thepart/' + part.id)
                .then(res => res.json())
                .then(data => {
                   
                    let newpart = {
                        name: data.name,
                        relatedEntries: data.relatedEntries
                    }
                    setParts(oldArray => [...oldArray, newpart]);
                    
                })
            })
        }
        else if(data.containsDoors && data.containsParts){
            data.relatedDoors.map(door =>{
                fetch('/thedoor/' + door)
                .then(res => res.json())
                .then(data =>{
                    let newDoor = {
                        id: data.id,
                        name: data.name,
                        relatedParts: data.relatedParts
                    }
                    setDoors(oldArr => [...oldArr, newDoor]);
                })
            })
        }
        else{
            data.relatedChapters.map(chapter => {
                setChapters(oldAr => [...oldAr, chapter])
            })
        }
       }) 
       
       
     },[])
    React.useEffect(function(){
        fetch('/entries/' + params.entryId)
        .then(res => res.json())
        .then(data => {
        setTheEntry(`${data.body}`)
        setTheTitle(`${data.title}`)
        setBibilography(`${data.bibiliography}`)
        setFavouriteUsers(data.favouriteusers)})
      setSearched(false)
 

    }, [params.entryId])
     React.useEffect(()=>{
        const fetchData = async () =>{
            setInFavourites(false)
                favouriteUsers.map(user =>{
                    if(user == requestUser) { setInFavourites(true) }
                })
            
        }
        fetchData()
        
     },[requestUser, favouriteUsers, params.entryId])
    const returnedParts = parts.map(thepart => {
        console.log(thepart)
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
        <Chapter chapterid = {thechapter} />
    )
})

function finalreturned(){
    if(containsDoors && containsParts){
        return(returnedDoors)
    }
    else if (!containsDoors && containsParts){
        console.log('containsParts')
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

        const ccc= reactStringReplace(theEntry, value, (match, i) => (
            `<mark><a href ="#mark-${i + 2}" id="mark-${i}">${match}</a></mark>`
           ));
     setTheSearchedEntry(ccc.join(""));
    setValue('')
  
  };
// const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     if (value != '') {
        
//       setList(list.concat(value));
//       setSearched(true)
//     }
//     else{
//         setSearched(false)
//     }

//         const ccc= reactStringReplace(theEntry, value, (match, i) => (
//             `<mark>${match}</mark>`
//            ));
//      setTheSearchedEntry(ccc.join(""));
//     setValue('')
//     // event.preventDefault();
//   };

  const { collapseSidebar, rtl } = useProSidebar();

  const downloadLink = `/articlepdf/${params.entryId}`;

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
    fetch('/putFavourites/' + params.entryId, {
        method: 'PUT',
        body: JSON.stringify({
            'fav' : inFavourites
        })
    }
    )   
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
  

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  
 
  const theauthors = authors.map(author =>{
    const redirect = `/authordetails/${author.id}`
    return(
        <a href={redirect} style={{textDecoration:'none', color:'#087cc4'}}><div className="SE--author">{author.name}</div></a>
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
                 <Sidebar toggled={false} defaultCollapsed={collapsedWidth()} rtl={true} style={{  zIndex:0}}>
               
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
         
      <div className="SE--bookName">{theBookName}</div>
                <div  className="SE--input--div">
                    <form  className="SE--input">
                            <input value={value} onChange={handleChange} type="search" placeholder="ابحث..." />
                            <button onClick={handleSubmit}>Search</button>
                    </form>
                </div>
            {finalreturned()}
 
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
                        <div style={{fontSize: '16px',fontWeight:'700', marginLeft:'30px'}}> المؤلفون:</div>
                        <div className="SE--authors--div">
                            {theauthors}
                        </div>
                    </div>
                    </div>
                </div>
                <ReactMarkdown className="SE--markdown--content" rehypePlugins={[rehypeRaw, remarkGfm]} children={searched ? theSearchedEntry : theEntry} remarkPlugins={[remarkGfm]} />
            </div>

  
        </div>

    )
        }



