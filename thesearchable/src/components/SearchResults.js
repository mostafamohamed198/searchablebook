import React, { Component ,useRef, useCallback, useState } from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import {ProSidebarProvider, Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Menu as MenuSearch, connectMenu,  Pagination,Stats, Panel,InstantSearch, SearchBox, Hits, RefinementList, Snippet , Configure} from "react-instantsearch-dom";
import ReactTags from 'react-tag-autocomplete'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
export default function SearchResults(){
  const [displayTable, setDisplayTable] = React.useState(false)
  const [approved, setApproved] = React.useState(false)
  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const reactTags = useRef()
  const params = useParams();
  const [searchBoxValue, setSearchBoxValue] = React.useState(params.resultvalue)
  const searchvalue = params.resultvalue


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

  const onDelete = useCallback((tagIndex) => {
    setTags(tags.filter((_, i) => i !== tagIndex))
  }, [tags])

  const onAddition = useCallback((newTag) => {

    if (tags[tags.length - 1] != null){
      if(newTag.name != 'AND' && newTag.name != 'OR' && newTag.name != 'NOT'){

          if(tags[tags.length - 1].name != 'AND' && tags[tags.length - 1].name != 'OR' && tags[tags.length - 1].name != 'NOT'){
       
          setTags([...tags, {id: null , name: 'AND'}, newTag])
      
        }
        else{
          setTags([...tags, newTag])
        }
      }
      else{
        setTags([...tags, newTag])
      }
    }
    else{
      setTags([...tags, newTag])
    }


    setSuggestions([])
  }, [tags])

  function onInput (query) {
   
    
    axios.post('http://16.170.70.218:9200/entries/_search', {
      
    query: {
      multi_match: {
          query: query,
          type: "bool_prefix",
          fields: [
              "title",
              "title._2gram",
              "title._3gram"
          ],
          // sort: ['_score', { createdDate: 'desc' }]
      }
  },
           
          })
          .then(res => {
           setSuggestions([])
            res.data.hits.hits.map(hit => {
              
              let newHit = {id: hit._source.id, name: hit._source.title }
              setSuggestions(oldArray => [...oldArray, newHit])
            })
       
          })

  }

  

  const sk = new Searchkit({
    connection: {
      host: "http://16.170.70.218:9200",
      // host: "http://localhost:9200",
      
  
    },
    search_settings: {
      highlight_attributes: ["title", 'body'],
      
      snippet_attributes: ['title',"body"],
      search_attributes: [{ field: "title", weight: 3 }, "body", "bibiliography", "source"],
      // search_attributes: ["source"],
      result_attributes: ['id',"title", "body", "bibiliography", 'entryCover', 'entryauthor', 'entryPubDate','entryCategory', 'viewsCounts', 'favouriteusers','source'],
      facet_attributes: ['title.key',  'entryOrigin.country.raw', 'entryClassification.theclass.key', 'entryauthor.name.key', 'entryCategory.thecategory.key'],
      // facet_attributes: ['title.key',  'entryOrigin.country.raw', 'entryClassification.theclass.key', 'entryauthor.name.key', {attribute: 'category_lvl1', field:'entryCategory.thecategory.key', type:'string'}],
      filter_attributes: [  { attribute: 'title', field: 'title.key', type: 'string' }]
    },
  })
  const searchClient = Client(sk, {
    getQuery: (query, search_attributes) => {
      return {
        query_string: {
          fields:["title", "body", "title.raw", "body.raw", "bibiliography","source", "entryauthor.name"],
          query: query
       }
  
  
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
    {/* <li>
    <button onClick={() => refine("")}>الكل {allCount}{items.map(item =>{
      
    })}</button>
    
    </li> */}
    
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
        <div  className="SR--searchbox">
 <div style={{width:'95%', textAlign:'right', fontSize:'30px', fontWeight:'700'}}>ابحث في المكتبة القانونية الإلكترونية:</div>
 
 <form className="SR--searchBox-form" onSubmit={searchFormSubmit}>
 <div style={tableStyle} className="SR--table--div">
      <table>
        <tr>
          <td className="SR--td">AND</td>
          <td className="SR--td">كل الكلمات يجب أن تكون في النتيجه </td>

        </tr>
        <tr>
          <td className="SR--td">OR</td>
          <td className="SR--td"> النتائج يجب أن تحتوي علي أي كلمه من كلمات البحث </td>
      
        </tr>
        <tr>
          <td className="SR--td">NOT</td>
          <td className="SR--td"> النتائج يمكن أن تحتوي علي أي كلمه ماعدا الكلمة التي تلي NOT </td>
   
        </tr>
        <tr>
          <td className="SR--td">*</td>
          <td className="SR--td"> يمكن استبدال أي حرف أو رقم مكان العلامة  </td>
  
        </tr>
       
      </table>
    </div>
 <ReactTags
      ref={reactTags}
      tags={tags}
      allowNew={true}
      suggestions={suggestions}
      onDelete={onDelete}
      onAddition={onAddition}
      onInput= {onInput}
      onFocus={() => setDisplayTable(true)}
        onBlur={() => setDisplayTable(false)}
      placeholderText = 'ابحث عن المصطلحات ، اسماء المؤلفين، المنشورات...'
    />
    {/* <input type="submit" /> */}
    <button className="SR--searchBox--button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} /></button>
    </form>
    </div>
    
    <div >
    <InstantSearch indexName="entries" searchClient={searchClient}>
      <div style={{'display': 'none'}}>
      {/* <div> */}
      <SearchBox
      // value='تسمية'

       defaultRefinement={searchBoxValue}
      translations={{ placeholder: 'ابحث هنا' }}
        searchAsYouType={false}
        onFocus={() => setDisplayTable(true)}
        onBlur={() => setDisplayTable(false)}
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
    
      <Configure

hitsPerPage={15}
/>
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