import React, { Component } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import {ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {HierarchicalMenu, ToggleRefinement, MenuSelect, Pagination,Stats, Panel,InstantSearch, SearchBox, Hits, RefinementList, Snippet } from "react-instantsearch-dom";


export default function SearchResults(){
 const [authentication, setAuthentication] = React.useState(false)
  const [requestUser, setRequestUser] = React.useState(0)
  const [displayTable, setDisplayTable] = React.useState(false)
  const [approved, setApproved] = React.useState(false)
  const params = useParams();
  const searchvalue = params.resultvalue
  React.useEffect(function(){
    fetch('/authentication_state' )
    .then(res => res.json())
    .then(data => {
      setAuthentication(data.authentication)
      setRequestUser(data.userid)  
     
    })

    fetch('/resultsapproval' )
    .then(res => res.json())
    .then(data => {
     setApproved(data.approved)
    })
  },[])
  const tableStyle = {
    display: displayTable ? 'block': 'none'
  }


  // function collapsedWidth(){
  //   const windowWidth = React.useRef(window.innerWidth);
  //   if (windowWidth.current >= 390){
  //           setLargeWindow(false)
  //   }
  //   else{
  //           setLargeWindow(true)
  //   }
   
  // }

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
      host: "http://localhost:9200",
  
    },
    search_settings: {
      highlight_attributes: ["title", 'body'],
      snippet_attributes: ['title',"body"],
      search_attributes: [{ field: "title", weight: 3 }, "body", "bibiliography"],
      result_attributes: ['id',"title", "body", "bibiliography", 'entryCover', 'entryauthor', 'entryPubDate','entryCategory', 'viewsCounts', 'favouriteusers'],
      facet_attributes: ['title.key',  'entryOrigin.country.raw', 'entryClassification.theclass.key', 'entryauthor.name.key', 'entryCategory.thecategory.key'],
      filter_attributes: [  { attribute: 'title', field: 'title.key', type: 'string' }]
    },
  })
  const searchClient = Client(sk, {
    getQuery: (query, search_attributes) => {
      return {
        query_string: {
          fields:["title^3", "body", "bibiliography"],
          query: query
       }
      // simple_query_string : {
      //   query:    query,
      //   fields: ["title^3", "body", "bibiliography"] 
      // }
  
    }
  }}, { debug: true });
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
    
   
    
    return (
      <div  className="SR--container">
       <div>
        <img src={hit.entryCover} style={{width:'85px', height:'120px'}}/>
        </div>
        <div className="SR--content">
        <p className="SR--category">{hit.entryCategory.thecategory}</p>
        <Link style={{textDecoration: 'none'}} to={theID}><h2 style={{color:'#087cc4'}}>{hit.title}</h2></Link>
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
        {theSnippetbody()}
        </div> 
      </div>
    )
  }

    
    return (
      
      // <div className="LP">
        <div className="ais-InstantSearch">
          
          {/* onSearchStateChange={false} */}
        
    <InstantSearch indexName="entries" searchClient={searchClient}>
      <div className="SR--searchbox">
 <div style={{width:'95%', textAlign:'right', fontSize:'22px', fontWeight:'700', marginTop:'10px' }}>قم بالبحث في قاعدة البيانات:</div>
      <SearchBox
       defaultRefinement={params.resultvalue}
      translations={{ placeholder: 'ابحث هنا' }}
        searchAsYouType={false}
        onFocus={() => setDisplayTable(true)}
        onBlur={() => setDisplayTable(false)}
        // prefixQuery
        // queryFields={["title", "body"]}
        // prefixQueryFields={["title", "body"]}
      />
    <div style={tableStyle} className="SR--table--div">
      <table>
        <tr>
          <td className="SR--td">AND</td>
          <td className="SR--td">كل الكلمات يجب أن تكون في النتيجه </td>
          <td className="SR--td">الفصل AND الثاني</td>
        </tr>
        <tr>
          <td className="SR--td">OR</td>
          <td className="SR--td"> النتائج يجب أن تحتوي علي أي كلمه من كلمات البحث </td>
          <td className="SR--td">الفصل OR الثاني</td>
        </tr>
        <tr>
          <td className="SR--td">NOT</td>
          <td className="SR--td"> النتائج يمكن أن تحتوي علي أي كلمه ماعدا الكلمة التي تلي NOT </td>
          <td className="SR--td">الفصل NOT الثاني</td>
        </tr>
        <tr>
          <td className="SR--td">*</td>
          <td className="SR--td"> يمكن استبدال أي حرف أو رقم مكان العلامة  </td>
          <td className="SR--td">  الفص*</td>
        </tr>
        <tr>
          <td className="SR--td">()</td>
          <td className="SR--td"> تستخدم لتجميع الأدوات المختلفه لموجموعه من الكلمات في نفس البحث  </td>
          <td className="SR--td"> (الفصل OR الثاني) AND الأول</td>
        </tr>
      </table>
    </div>
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
     
      <RefinementList translations={{ placeholder: 'ابحث هنا' }} attribute='entryOrigin.country.raw' searchable={true} limit={20} />
 
      </Panel>
      </SubMenu>
      <SubMenu icon='' defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='التصنيف:'>
      <Panel>
      
      <RefinementList translations={{ placeholder: 'ابحث هنا' }} attribute='entryClassification.theclass.key' searchable={true} limit={20} />
      </Panel>
      </SubMenu>
      <SubMenu defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='الفئة:'>
      <Panel>

        <RefinementList translations={{ placeholder: 'ابحث هنا' }} attribute='entryCategory.thecategory.key' searchable={true} limit={20} />
      </Panel>
      </SubMenu>
           
        </Menu> 
        
   
      </Sidebar>

      {/* </div> */}
      <div className="right-panel">
 
      
                  <Stats />
      <Hits hitComponent={hitView} /> 
      <Pagination />
      </div>
      </div>
  
  </InstantSearch>
  
</div>
      
    // </div>
    
    )
}

