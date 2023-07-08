// import React from "react";
// import Pagination from 'rc-pagination';
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import AuthContext from "../authentication/AuthContext";
// export default function Favourites(){
//     let {authTokens} = useContext(AuthContext)
//     const [userFavouriteEntries, setUserFavouriteEntries] = React.useState([])
//     const [perPage, setPerPage] = React.useState(10);
//     const [size, setSize] = React.useState(perPage);
//     const [current, setCurrent] = React.useState(1);
    
//     React.useEffect(function(){

//         fetch('/favouriteEntries/', {
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer ' + String(authTokens.access)
//             }
//         })
//         .then(res => res.json())
//         .then(data => {
//                     setUserFavouriteEntries(data)
//               })
//     },[])


//         const PerPageChange = (value) => {
//             setSize(value);
//             const newPerPage = Math.ceil(userFavouriteEntries.length / value);
//             if (current > newPerPage) {
//                 setCurrent(newPerPage);
//             }
//         }
    
//         const getData = (current, pageSize) => {
//             // Normally you should get the data from the server
//             return userFavouriteEntries.slice((current - 1) * pageSize, current * pageSize);
//         };
    
//         const PaginationChange = (page, pageSize) => {
//             setCurrent(page);
//             setSize(pageSize)
//         }
    
//         const PrevNextArrow = (current, type, originalElement) => {
//             if (type === 'prev') {
//                 return <button><i className="fa fa-angle-double-left"></i></button>;
//             }
//             if (type === 'next') {
//                 return <button><i className="fa fa-angle-double-right"></i></button>;
//             }
//             return originalElement;
//         }
//     const favouritesList = getData(current, size).map(entry => {
//         const resultingAuthors = entry.entryauthor.map(author => {
//             const authid= `/authordetails/${author.id}`
//             return (
//                 <Link to={authid}><div>{author.name}،</div></Link>
//             )
//         })
//         const entryLink = `/entry/${entry.id}/`

//         return(
//             <div className="ais-Hits-item">
//             <div  className="SR--container">
//       <div>
//         <img src={entry.entryCover} style={{width:'85px', height:'120px'}}/>
//         </div>
//         <div className="SR--content">
//         <p className="SR--category">{entry.entryCategory.thecategory}</p>
//         <Link style={{textDecoration: 'none'}} to={entryLink}><h2 style={{color:'#087cc4'}}>{entry.title}</h2></Link>
//         <div className="SR--authors--div">
//             <p className="SR--authors--title">المؤلفون:</p> 
//          <div className="SR--authors--names">
//             {resultingAuthors}
//          </div>
//         </div>
//         <div className="SR--pubdate">
//           <p className="SR--pubdate--title">تاريخ الإصدار:</p >
//           <div>{entry.entryPubDate}</div>
//         </div>
        
//         </div>
//       </div>
//       </div>
//         )
//     })

//     return (
//         <div className="favourites--div">
//               <div className="Cat--div">
//                 <h2>قائمة المفضلات:</h2>
    
//                </div>
//             {favouritesList}
//             <Pagination
//                     className="pagination-data"
//                     onChange={PaginationChange}
//                     total={userFavouriteEntries.length}
//                     current={current}
//                     pageSize={size}
//                     showSizeChanger={false}
//                     itemRender={PrevNextArrow}
//                     onShowSizeChange={PerPageChange}
//                 />
//         </div>
//     )
// }

// import React from "react";
// import Pagination from 'rc-pagination';
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import AuthContext from "../authentication/AuthContext";
// export default function Favourites(){
//     let {authTokens} = useContext(AuthContext)
//     const [userFavouriteEntries, setUserFavouriteEntries] = React.useState([])
//     const [perPage, setPerPage] = React.useState(10);
//     const [size, setSize] = React.useState(perPage);
//     const [current, setCurrent] = React.useState(1);
    
//     React.useEffect(function(){

//         fetch('/favouriteBooks/', {
//             method:'GET',
//             headers:{
//                 'Content-Type':'application/json',
//                 'Authorization':'Bearer ' + String(authTokens.access)
//             }
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//                     setUserFavouriteEntries(data)
//               })
//     },[])


//         const PerPageChange = (value) => {
//             setSize(value);
//             const newPerPage = Math.ceil(userFavouriteEntries.length / value);
//             if (current > newPerPage) {
//                 setCurrent(newPerPage);
//             }
//         }
    
//         const getData = (current, pageSize) => {
//             // Normally you should get the data from the server
//             return userFavouriteEntries.slice((current - 1) * pageSize, current * pageSize);
//         };
    
//         const PaginationChange = (page, pageSize) => {
//             setCurrent(page);
//             setSize(pageSize)
//         }
    
//         const PrevNextArrow = (current, type, originalElement) => {
//             if (type === 'prev') {
//                 return <button><i className="fa fa-angle-double-left"></i></button>;
//             }
//             if (type === 'next') {
//                 return <button><i className="fa fa-angle-double-right"></i></button>;
//             }
//             return originalElement;
//         }
//     const favouritesList = getData(current, size).map(entry => {
//         const resultingAuthors = entry.author.map(author => {
//             const authid= `/authordetails/${author.id}`
//             return (
//                 <Link to={authid}><div>{author.name}،</div></Link>
//             )
//         })
//         const entryLink = `/book/${entry.id}/`

//         return(
//             <div className="ais-Hits-item">
//             <div  className="SR--container">
//       <div>
//         <img src={entry.cover} style={{width:'85px', height:'120px'}}/>
//         </div>
//         <div className="SR--content">
//         <p className="SR--category">{entry.bookCategory.thecategory}</p>
//         <Link style={{textDecoration: 'none'}} to={entryLink}><h2 style={{color:'#087cc4'}}>{entry.name}</h2></Link>
//         <div className="SR--authors--div">
//             <p className="SR--authors--title">{}</p> 
//          <div className="SR--authors--names">
//             {resultingAuthors}
//          </div>
//         </div>
//         <div className="SR--pubdate">
//           <p className="SR--pubdate--title">تاريخ الإصدار:</p >
//           <div>{entry.publicationDate}</div>
//         </div>
        
//         </div>
//       </div>
//       </div>
//         )
//     })

//     return (
    
//         // // <div>console</div>
//         <div className="favourites--div">
//               <div className="Cat--div">
//                 <h2>قائمة المفضلات:</h2>
    
//                </div>
//             {favouritesList}
//             <Pagination
//                     className="pagination-data"
//                     onChange={PaginationChange}
//                     total={userFavouriteEntries.length}
//                     current={current}
//                     pageSize={size}
//                     showSizeChanger={false}
//                     itemRender={PrevNextArrow}
//                     onShowSizeChange={PerPageChange}
//                 />
//         </div>
//     )
// }


// import React, { Component ,useRef, useCallback, useState } from "react";
// import {Route, Link, Routes, useParams} from 'react-router-dom';
// import Client from "@searchkit/instantsearch-client";
// import Searchkit from "searchkit";
// import {ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import {SortBy, HierarchicalMenu, Menu as MenuSearch, connectMenu, ToggleRefinement, MenuSelect, Pagination,Stats, Panel,InstantSearch, SearchBox, Hits, RefinementList, Snippet } from "react-instantsearch-dom";
// import ReactTags from 'react-tag-autocomplete'
// import axios from "axios";
// import AuthContext from "../authentication/AuthContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
// export default function Favourites(){
//   const [displayTable, setDisplayTable] = React.useState(false)
//   const [approved, setApproved] = React.useState(false)
//   const [tags, setTags] = useState([])
//   const [suggestions, setSuggestions] = useState([])
//   const reactTags = useRef()
//   const params = useParams();
//   const [searchBoxValue, setSearchBoxValue] = React.useState('')
//   let {user, logoutUser} = React.useContext(AuthContext)

//   React.useEffect(function(){
    

//     fetch('/resultsapproval' )
//     .then(res => res.json())
//     .then(data => {
//      setApproved(data.approved)
//     })
//   },[])
//   const tableStyle = {
//     display: displayTable ? 'block': 'none'
//   }


 

//   function collapsedWidth(){
//     const windowWidth = React.useRef(window.innerWidth);
//     if (windowWidth.current >= 390){
//             return(
//               false
//             )
//     }
//     else{
//             return(
//               true
//             )
//     }
   
//   }

//   const onDelete = useCallback((tagIndex) => {
//     setTags(tags.filter((_, i) => i !== tagIndex))
//   }, [tags])

//   const onAddition = useCallback((newTag) => {

//     if (tags[tags.length - 1] != null){
//       if(newTag.name != 'AND' && newTag.name != 'OR' && newTag.name != 'NOT'){

//           if(tags[tags.length - 1].name != 'AND' && tags[tags.length - 1].name != 'OR' && tags[tags.length - 1].name != 'NOT'){
       
//           setTags([...tags, {id: null , name: 'AND'}, newTag])
      
//         }
//         else{
//           setTags([...tags, newTag])
//         }
//       }
//       else{
//         setTags([...tags, newTag])
//       }
//     }
//     else{
//       setTags([...tags, newTag])
//     }


//     setSuggestions([])
//   }, [tags])

//   function onInput (query) {
   
    
//     axios.post('http://localhost:9200/entries/_search', {
      
//     query: {
//         match: {
//             tags: user.userid 
//           }
//   },
           
//           })
//           .then(res => {
//            setSuggestions([])
//             res.data.hits.hits.map(hit => {
              
//               let newHit = {id: hit._source.id, name: hit._source.title }
//               setSuggestions(oldArray => [...oldArray, newHit])
//             })
       
//           })
//     // console.log(query)
//   }

  

//   const sk = new Searchkit({
//     connection: {
//       host: "http://localhost:9200",
  
//     },
//     search_settings: {
//       highlight_attributes: ["title", 'body'],
//       snippet_attributes: ['title',"body"],
//       search_attributes: [{ field: "title", weight: 3 }, "body", "bibiliography", "source"],
//       // search_attributes: ["source"],
//       result_attributes: ['id',"title", "body", "bibiliography", 'entryCover', 'entryauthor', 'entryPubDate','entryCategory', 'viewsCounts', 'favouriteusers','source'],
//       facet_attributes: ['title.key',  'entryOrigin.country.raw', 'entryClassification.theclass.key', 'entryauthor.name.key', 'entryCategory.thecategory.key'],
//       // facet_attributes: ['title.key',  'entryOrigin.country.raw', 'entryClassification.theclass.key', 'entryauthor.name.key', {attribute: 'category_lvl1', field:'entryCategory.thecategory.key', type:'string'}],
//       filter_attributes: [  { attribute: 'title', field: 'title.key', type: 'string' }]
//     },
//   })
//   const searchClient = Client(sk, {
//     getQuery: (query, search_attributes) => {
//       return {
//     //     query_string: {
//     //       fields:["title^3", "body", "bibiliography","source", "entryauthor.name"],
//     //       query: query
//     //    }
//     // query: {
//     //     nested: {
//     //        path: "favouriteusers",
//     //        query: {
//     //            match: {
//     //               "favouriteusers.id" : user.user_id
//     //            }
//     //        }
//     //     }
//     // }
    
//         "query": {
//           "nested": {
//             "path": "favouriteusers",
//             "query": {
//               "bool": {
//                 "must": [
//                   { "match": { "favouriteusers.id": user.user_id } },
//                 //   { "range": { "obj1.count": { "gt": 5 } } }
//                 ]
//               }
//             },
//             // "score_mode": "avg"
//           }
//         }
      
  
//     }
//   }}, { debug: true });

//   const customSearchClient = {
//     search(requests) {
//         return fetch('/favouriteEntries/', {
//           method: 'post',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization':'Bearer ' + String(authTokens.access),
//           },
//           body: JSON.stringify({ requests }),
//         }).then(res => res.json()),
       
        
//       }
//   }

//   console.log(user.user_id)
  
//   const { collapseSidebar, rtl } = useProSidebar();
//   // const searchClient = Client(sk);
//   const hitView = ({ hit }) => {
  
//     const [inFavourites, setInFavourites] = React.useState(false)
//       const resultingAuthors = hit.entryauthor.map(author =>{
//    const authorid = `/authordetails/${author.id}`
//       return(
//         <Link to={authorid}><div>{author.name}،</div></Link>
//       )
//     })
  

//     const thesnip = <p><Snippet hit={hit} attribute="body" /></p>
//     const theID = `/entry/${hit.id}`
    
   
//     function theSnippetbody(){
//       if( hit._snippetResult.body.matchLevel != 'none'){
//         return(
// <p><Snippet hit={hit} attribute="body"/></p>    
//         )
//       }
//       else if(hit._snippetResult.title.matchLevel != 'none'){
//         return(
//           <p><Snippet hit={hit} attribute="title" /></p>    
//                   )
//       }
//     }
//     function hitSource(){
//       if (hit.source != null){
//         return(
//           <div className="SR--pubdate">
//           <p className="SR--pubdate--title">المصدر:</p >
//           <div>{hit.source}</div>
//         </div>
//         )
        
//       }
//     }
   
    
//     return (
//       <div  className="SR--container">
//        <div>
//         <img src={hit.entryCover} style={{width:'85px', height:'120px'}}/>
//         </div>
//         <div className="SR--content">
//         <p className="SR--category">{hit.entryCategory.thecategory}</p>
//         <Link style={{textDecoration: 'none'}} to={theID}><h2 className="SR--hit--heading">{hit.title}</h2></Link>
//         <div className="SR--authors--div">
//             <p className="SR--authors--title">المؤلفون:</p> 
//          <div className="SR--authors--names">
//             {resultingAuthors}
//          </div>
//         </div>
//         <div className="SR--pubdate">
//           <p className="SR--pubdate--title">تاريخ الإصدار:</p >
//           <div>{hit.entryPubDate}</div>
//         </div>

//         {hitSource()}
//         {theSnippetbody()}
//         </div> 
//       </div>
//     )
  
//   }

//   function searchFormSubmit(event){
//     event.preventDefault()
 
//     let thestring = ''
//     tags.map(tag => {
//       console.log(tag.name)
 
//       if(tag.name != 'AND' && tag.name != 'OR' && tag.name != 'NOT'){
//       thestring = `${thestring} (${tag.name})`
//       }
//       else{
//         thestring = `${thestring} ${tag.name}`
//       }

//     })
//     setSearchBoxValue(thestring)
 
//   }

    


// const TheMenu = ({ items, isFromSearch, refine, searchForItems, createURL }) => {
// const selectedStyle = {list: {
//   borderBottom: 'solid rgb(103, 103, 103)',
//   fontWeight: '700',
// },
// // number:{
// //   backgroundColor: 'rgb(103, 103, 103)',
// //   color: 'white'
// // }
// }

// const nonSelectedStyle = {list: {
//   borderBottom: 'none',
//   fontWeight: '500',

// },
// // number:{
// //   backgroundColor: 'none',
// //   color: 'rgb(103, 103, 103)'
// // }
// }
// let allCount = 0
// items.map(item =>{
//   allCount = allCount + item.count
// })
// const [allHits, setAllHits] = React.useState(true)
//   return (
//   <ul className="SR--categories--Menu">
//     {/* <li>
//     <button onClick={() => refine("")}>الكل {allCount}{items.map(item =>{
      
//     })}</button>
    
//     </li> */}
    
// <li key= '0' className="SR--categories--Menu--li">
// <a
//           href=""
//           style={allHits ? selectedStyle.list : nonSelectedStyle.list}
//           onClick={event => {
//             event.preventDefault();
//             refine('');
//             setAllHits(true)
//           }}
//           className="SR--categories--Menu--a"
//         >
   
//           الكل
//           <span className="SR--categories--Menu--count" >({allCount})</span>
       
      
//       </a>
//       </li>
//     {items.map(item => (
//       <li className="SR--categories--Menu--li" key={item.value}>
//         <a
//           href={createURL(item.value)}
//           style={item.isRefined ? selectedStyle.list : nonSelectedStyle.list}
//           onClick={event => {
//             event.preventDefault();
//             refine(item.value);
//             setAllHits(false)
//           }}
//         >
         
//           {isFromSearch ? (
//             <Highlight attribute="label" hit={item} />
//           ) : (
//             item.label
//           )}{' '}
//           <span className="SR--categories--Menu--count">({item.count})</span>
//         </a>
//       </li>
//     ))}
//   </ul>
// )};

// const CustomMenu = connectMenu(TheMenu);

//     return (
      
//       // <div className="LP">
//         <div className="ais-InstantSearch">
         
//           {/* onSearchStateChange={false} */}
        
//       <div>
//         <div  className="SR--searchbox">
//  <div style={{width:'95%', textAlign:'right', fontSize:'30px', fontWeight:'700'}}>ابحث في المكتبة القانونية الإلكترونية:</div>
 
//  <form className="SR--searchBox-form" onSubmit={searchFormSubmit}>
//  <div style={tableStyle} className="SR--table--div">
//       <table>
//         <tr>
//           <td className="SR--td">AND</td>
//           <td className="SR--td">كل الكلمات يجب أن تكون في النتيجه </td>

//         </tr>
//         <tr>
//           <td className="SR--td">OR</td>
//           <td className="SR--td"> النتائج يجب أن تحتوي علي أي كلمه من كلمات البحث </td>
      
//         </tr>
//         <tr>
//           <td className="SR--td">NOT</td>
//           <td className="SR--td"> النتائج يمكن أن تحتوي علي أي كلمه ماعدا الكلمة التي تلي NOT </td>
   
//         </tr>
//         <tr>
//           <td className="SR--td">*</td>
//           <td className="SR--td"> يمكن استبدال أي حرف أو رقم مكان العلامة  </td>
  
//         </tr>
       
//       </table>
//     </div>
//  <ReactTags
//       ref={reactTags}
//       tags={tags}
//       allowNew={true}
//       suggestions={suggestions}
//       onDelete={onDelete}
//       onAddition={onAddition}
//       onInput= {onInput}
//       onFocus={() => setDisplayTable(true)}
//         onBlur={() => setDisplayTable(false)}
//       placeholderText = 'ابحث عن المصطلحات ، اسماء المؤلفين، المنشورات...'
//     />
//     {/* <input type="submit" /> */}
//     <button className="SR--searchBox--button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} /></button>
//     </form>
//     </div>
    
//     <div >
//     <InstantSearch indexName="entries" searchClient={customSearchClient}>
//       <div style={{'display': 'none'}}>
//       {/* <div> */}
//       <SearchBox
//       // value='تسمية'

//        defaultRefinement={searchBoxValue}
//       translations={{ placeholder: 'ابحث هنا' }}
//         searchAsYouType={false}
//         onFocus={() => setDisplayTable(true)}
//         onBlur={() => setDisplayTable(false)}
//           />
// </div>

//     <div className="SR--pandel--div">

// {/* 
//        <div className="left-panel"> */}
//        <Sidebar defaultCollapsed={collapsedWidth()} rtl={true} style={{  zIndex:0}}>
//      <Menu>
//        <MenuItem
//             icon={<MenuOutlinedIcon />}
//             onClick={() => {
//               collapseSidebar();
//             }}
//             style={{ textAlign: "center" }}
//           >
//             {" "}
         
//           </MenuItem>
    
//         {/* </Menu>
 
 
//      <Menu style={{width:'350px'}}> */}
//      <SubMenu icon='' defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}}label='الدولة:'>
//         <Panel>
     
//       <RefinementList translations={{ placeholder: 'ادحل اسم البلد' }} attribute='entryOrigin.country.raw' searchable={true} limit={20} />
 
//       </Panel>
//       </SubMenu>
    
//       <SubMenu icon='' defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='التصنيف:'>
//       <Panel>
      
//       <RefinementList translations={{ placeholder: "ادخل اسم التصنيف" }} attribute='entryClassification.theclass.key' searchable={true} limit={20} />
//       </Panel>
//       </SubMenu>
//       <SubMenu defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='الفئة:'>
//       <Panel>

//         <RefinementList translations={{ placeholder: "ادخل اسم الفئة" }} attribute='entryCategory.thecategory.key' searchable={true} limit={20} />
//       </Panel>
//       </SubMenu>
    
//       <SubMenu defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='المؤلف:'>
//       <Panel>

//         <RefinementList translations={{ placeholder: "ادخل اسم المؤلف" }} attribute='entryauthor.name.key' searchable={true} limit={20} />
//       </Panel>
//       </SubMenu>
//         </Menu> 
        
   
//       </Sidebar>

//       {/* </div> */}
//       <div className="right-panel">
        
//       <CustomMenu attribute="entryCategory.thecategory.key" searchable />
    
      
//                   <Stats />
//       <Hits hitComponent={hitView} /> 
//       <Pagination />
//       </div>
//       </div>
//         </InstantSearch>


//       </div>
    
//       </div>

  

  
// </div>
      
//     // </div>
    
//     )
// }








import React, { Component ,useRef, useCallback, useState } from "react";
import {Route, Link, Routes, useParams,} from 'react-router-dom';
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import {ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {Configure, SortBy, HierarchicalMenu, Menu as MenuSearch, connectMenu, ToggleRefinement, MenuSelect, Pagination,Stats, Panel,InstantSearch, SearchBox, Hits, RefinementList, Snippet } from "react-instantsearch-dom";
import ReactTags from 'react-tag-autocomplete'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import AuthContext from "../authentication/AuthContext";
export default function Favourites(){
  const [displayTable, setDisplayTable] = React.useState(false)

  const [tags, setTags] = useState([])

  const reactTags = useRef()
  const params = useParams();

  let {user} = React.useContext(AuthContext)


  const tableStyle = {
    display: displayTable ? 'block': 'none'
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


  

  
  const sk = new Searchkit({
    connection: {
      host: "http://13.53.171.156:9200",
  
    },
    search_settings: {
      highlight_attributes: ["favouriteusers"],
      snippet_attributes: ['title',"body"],
      search_attributes: ["favouriteusers"],
      result_attributes: ['id',"title", "body", "bibiliography", 'entryCover', 'entryauthor', 'entryPubDate','entryCategory', 'viewsCounts', 'favouriteusers','source'],
      facet_attributes: ['title.key',  'entryOrigin.country.raw', 'entryClassification.theclass.key', 'entryauthor.name.key', 'entryCategory.thecategory.key'],
      filter_attributes: [  { attribute: 'title', field: 'title.key', type: 'string' }, {attribute: 'favouriteusers.id.key', field: 'favouriteusers.id.key',  type:'numeric'}]
    },
  })
//   const searchClient = Client(sk);
 
const searchClient = Client(sk, {
    getQuery: (query, search_attributes) => {
      return [
        {
          multi_match: {
            query: query,
            fields: search_attributes,
            type: "cross_fields",
          },
        },
      ];
    }
  });


  const { collapseSidebar, rtl } = useProSidebar();
  // const searchClient = Client(sk);
  const hitView = ({ hit }) => {
    const [inFavourites, setInFavourites] = React.useState(false)
      const resultingAuthors = hit.entryauthor.map(author =>{
   const authorid = `/authordetails/${author.id}`
      return(
        <Link to={authorid}><div>{author.name}،</div></Link>
      )
    })
  

    const thesnip = <p><Snippet hit={hit} attribute="body" /></p>
    const theID = `/entry/${hit.id}`
    
   
    function theSnippetbody(){
      if( hit._snippetResult.body.matchLevel != 'none'){
        return(
<p><Snippet hit={hit} attribute="body"/></p>    
        )
      }
      else if(hit._snippetResult.title.matchLevel != 'none'){
        return(
          <p><Snippet hit={hit} attribute="title" /></p>    
                  )
      }
    }
    function hitSource(){
      if (hit.source != null){
        return(
          <div className="SR--pubdate">
          <p className="SR--pubdate--title">المصدر:</p >
          <div>{hit.source}</div>
        </div>
        )
        
      }
    }
 
    
    return (
      <div  className="SR--container">
       <div>
        <img src={hit.entryCover} style={{width:'85px', height:'120px'}}/>
        </div>
        <div className="SR--content">
        <p className="SR--category">{hit.entryCategory.thecategory}</p>
        <Link style={{textDecoration: 'none'}} to={theID}><h2 className="SR--hit--heading">{hit.title}</h2></Link>
        <div className="SR--authors--div">
            <p className="SR--authors--title">المؤلفون:</p> 
         <div className="SR--authors--names">
            {resultingAuthors}
         </div>
        </div>
        <div className="SR--pubdate">
          <p className="SR--pubdate--title">تاريخ الإصدار:</p >
          <div>{hit.entryPubDate}</div>
        </div>

        {hitSource()}
        {theSnippetbody()}
        </div> 
      </div>
    )
    
  }

  function searchFormSubmit(event){
    event.preventDefault()
 
    let thestring = ''
    tags.map(tag => {
      console.log(tag.name)
 
      if(tag.name != 'AND' && tag.name != 'OR' && tag.name != 'NOT'){
      thestring = `${thestring} (${tag.name})`
      }
      else{
        thestring = `${thestring} ${tag.name}`
      }

    })
    setSearchBoxValue(thestring)
 
  }

    


const TheMenu = ({ items, isFromSearch, refine, searchForItems, createURL }) => {
const selectedStyle = {list: {
  borderBottom: 'solid rgb(103, 103, 103)',
  fontWeight: '700',
},
// number:{
//   backgroundColor: 'rgb(103, 103, 103)',
//   color: 'white'
// }
}

const nonSelectedStyle = {list: {
  borderBottom: 'none',
  fontWeight: '500',

},
// number:{
//   backgroundColor: 'none',
//   color: 'rgb(103, 103, 103)'
// }
}
let allCount = 0
items.map(item =>{
  allCount = allCount + item.count
})
const [allHits, setAllHits] = React.useState(true)
  return (
  <ul className="SR--categories--Menu">

    
<li key= '0' className="SR--categories--Menu--li">
<a
          href=""
          style={allHits ? selectedStyle.list : nonSelectedStyle.list}
          onClick={event => {
            event.preventDefault();
            refine('');
            setAllHits(true)
          }}
          className="SR--categories--Menu--a"
        >
   
          الكل
          <span className="SR--categories--Menu--count" >({allCount})</span>
       
      
      </a>
      </li>
    {items.map(item => (
      <li className="SR--categories--Menu--li" key={item.value}>
        <a
          href={createURL(item.value)}
          style={item.isRefined ? selectedStyle.list : nonSelectedStyle.list}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
            setAllHits(false)
          }}
        >
         
          {isFromSearch ? (
            <Highlight attribute="label" hit={item} />
          ) : (
            item.label
          )}{' '}
          <span className="SR--categories--Menu--count">({item.count})</span>
        </a>
      </li>
    ))}
  </ul>
)};

const CustomMenu = connectMenu(TheMenu);

    return (
      
      // <div className="LP">
        <div className="ais-InstantSearch">
         
          {/* onSearchStateChange={false} */}
        
      <div>
        {/* <div  className="SR--searchbox"> 
    </div> */}
    
    <div >
    <InstantSearch indexName="entries" searchClient={searchClient}>
      <div style={{'display': 'none'}}>
  

<Configure
//   filters="favouriteusers.id.key:2"
filters={`favouriteusers.id.key:${user.user_id}`}
  hitsPerPage={15}
/>
</div>

    <div className="SR--pandel--div">

{/* 
       <div className="left-panel"> */}
       <Sidebar defaultCollapsed={collapsedWidth()} rtl={true} style={{  zIndex:0}}>
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
    
        {/* </Menu>
 
 
     <Menu style={{width:'350px'}}> */}
     <SubMenu icon='' defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}}label='الدولة:'>
        <Panel>
     
      <RefinementList translations={{ placeholder: 'ادحل اسم البلد' }} attribute='entryOrigin.country.raw' searchable={true} limit={20} />
 
      </Panel>
      </SubMenu>
    
      <SubMenu icon='' defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='التصنيف:'>
      <Panel>
      
      <RefinementList translations={{ placeholder: "ادخل اسم التصنيف" }} attribute='entryClassification.theclass.key' searchable={true} limit={20} />
      </Panel>
      </SubMenu>
      <SubMenu defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='الفئة:'>
      <Panel>

        <RefinementList translations={{ placeholder: "ادخل اسم الفئة" }} attribute='entryCategory.thecategory.key' searchable={true} limit={20} />
      </Panel>
      </SubMenu>
    
      <SubMenu defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='المؤلف:'>
      <Panel>

        <RefinementList translations={{ placeholder: "ادخل اسم المؤلف" }} attribute='entryauthor.name.key' searchable={true} limit={20} />
      </Panel>
      </SubMenu>
        </Menu> 
        
   
      </Sidebar>

      {/* </div> */}
      <div className="right-panel">
        
      <CustomMenu attribute="entryCategory.thecategory.key" searchable />
    
      
                  <Stats />
      <Hits hitComponent={hitView} /> 
      <Pagination />
      </div>
      </div>
        </InstantSearch>


      </div>
    
      </div>

  

  
</div>
      
    // </div>
    
    )
}