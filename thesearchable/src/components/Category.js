

import React, { Component } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
// import { ReactiveBase, DataSearch, SearchBox, MultiList } from "@appbaseio/reactivesearch";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import {ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {HierarchicalMenu, ToggleRefinement, MenuSelect, Pagination,Stats, Panel,InstantSearch, SearchBox, Hits, RefinementList, Snippet } from "react-instantsearch-dom";

export default function Category(props){
  // const params = useParams();
  const [largeWindow, setLargeWindow] = React.useState(true)
  const [categoryName, setCategoryName] = React.useState('')

  React.useEffect(function(){
        fetch('/categorydetail/' + props.id)
        .then(res => res.json())
        .then(data => {
            setCategoryName(data.thecategory)
        })
  },[props.id])

  const sk = new Searchkit({
    connection: {
      host: "http://localhost:9200",
  
    },
    search_settings: {
      highlight_attributes: ["title", 'body'],
      snippet_attributes: ['title',"body"],
      search_attributes: [{ field: "title", weight: 3 }, "body", "bibiliography"],
      result_attributes: ['id',"title", "body", "bibiliography", 'entryCover', 'entryauthor', 'entryPubDate','entryCategory'],
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
    }
  }}, { debug: true });
  const { collapseSidebar, rtl } = useProSidebar();
  // const searchClient = Client(sk);
  const hitView = ({ hit }) => {  
    const thesnip = <p><Snippet hit={hit} attribute="body" /></p>
    const theID = `/entry/${hit.id}`
 
    return (
    <div >
            <Link to={theID}>
        <div className="LP--product--card">
        <div className="LP--PD--media">
          <span className="LP--PD--media--tigger">
          <img src={hit.entryCover}className="LP--PD--media--image"/>
          </span>
        </div>
        <div className="LP--PD--info">
         {hit.title}
        </div>
      </div>
      </Link>
      </div>
    )
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
      
      // <div className="LP">
        <div className="ais-InstantSearch">
    <InstantSearch onSearchStateChange={false} indexName="entries" searchClient={searchClient}>
   
      <div className="SR--pandel--div">
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
     <SubMenu defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}}label='الدولة:'>
        <Panel>
      <RefinementList translations={{ placeholder: 'ابحث هنا' }} attribute='entryOrigin.country.raw' searchable={true} limit={20} />
      </Panel>
      </SubMenu>
      <SubMenu defaultOpen={true} style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='التصنيف:'>
      <Panel>
      <RefinementList translations={{ placeholder: 'ابحث هنا' }} attribute='entryClassification.theclass.key' searchable={true} limit={20} />
      </Panel>
      </SubMenu>
      <SubMenu style={{fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px', display:'none'}} label='الفئة:'>
      <Panel>
        <RefinementList attribute='entryCategory.thecategory.key'  defaultRefinement={[`${categoryName}`]} searchable={true} limit={20} />
      </Panel>
      </SubMenu>
        </Menu> 
      </Sidebar>
      {/* </div> */}
      <div className="right-panel">
    <div className="Cat--div">
        <h2>{categoryName}</h2>
      <Hits hitComponent={hitView} /> 
      </div>
      <Pagination />
      </div>
      </div>
  </InstantSearch>
</div>
    )
}