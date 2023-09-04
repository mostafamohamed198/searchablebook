import React from "react";
import { Link} from 'react-router-dom';
// import { ReactiveBase, DataSearch, SearchBox, MultiList } from "@appbaseio/reactivesearch";
import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {Configure, Pagination, Panel,InstantSearch,  RefinementList, Snippet, Hits } from "react-instantsearch-dom";

export default function Category(props){
  // const params = useParams();
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
      host: "http://16.170.70.218:9200",
      // host: "http://localhost:9200",
  
    },
    search_settings: {
      highlight_attributes: ["name"],
      sorting: {default: {field: 'publicationDate', order: 'desc'}},
      snippet_attributes: ['name'],
      search_attributes: [{ field: "name", weight: 3 }],
      result_attributes: ['id',"name", 'cover', 'author', 'bookCategory', 'publicationDate'],
      facet_attributes: ['name.key',  'bookOrigin.country.raw', 'bookClassification.theclass.key', 'author.name.key', 'bookCategory.thecategory.key'],
      filter_attributes: [  { attribute: 'name', field: 'name.key', type: 'string' }]
    },
  })
  const searchClient = Client(sk, {
    getQuery: (query, search_attributes) => {
      return {
        query_string: {
          fields:["name^3"],
          query: query,
        //   sort : [
        //     {publicationDate : {"order" : "asc"}}
        //  ]
       }
    }
  }}, { debug: true });
  const { collapseSidebar, rtl } = useProSidebar();

  const hitView = ({ hit }) => {
 

    function bookAuthors(){
      const theAuthors = hit.author.map(author =>{
        const authorid = `/authordetails/${author.id}`

           return(
             <Link to={authorid}><div>{author.name}،</div></Link>
           )

         })
         if(hit.author.length > 1){
            return(
              <div className="SR--authors--div">
              <p className="SR--authors--title">المؤلفون:</p> 
           <div className="SR--authors--names">
              {theAuthors}
           </div>
          </div>
            )
         }
         else{
          return(
            <div className="SR--authors--div">
            <p className="SR--authors--title">المؤلف:</p> 
         <div className="SR--authors--names">
            {theAuthors}
         </div>
        </div>
          )
         }
    }
// console.log(hit)
// console.log(hit.publicationDate)
  
    const theID = `/book/${hit.id}` 
    return (
      <div  className="SR--container">
       <div>
        <img src={hit.cover} style={{width:'85px', height:'120px'}}/>
        </div>
        <div className="SR--content">
        <p className="SR--category">{hit.bookCategory.thecategory}</p>
        <Link style={{textDecoration: 'none'}} to={theID}><h2 className="SR--hit--heading">{hit.name}</h2></Link>
        {bookAuthors()}
        <div className="SR--pubdate">
          <p className="SR--pubdate--title">تاريخ الإصدار:</p >
          <div>{hit.publicationDate}</div>
        </div>

  
        </div> 
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
      <InstantSearch indexName="books" searchClient={searchClient}>
        <div className="SR--pandel--div">
          {/* Sidebar */}
          <Sidebar defaultCollapsed={collapsedWidth()} rtl={true} style={{ zIndex: 0 }}>
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
              <SubMenu
                defaultOpen={true}
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#087cc4',
                  overflow: 'hidden',
                  borderBottom: 'solid rgb(220, 220, 220)',
                  borderWidth: '2px'
                }}
                label='الدولة:'
              >
                <Panel>
                  <RefinementList translations={{ placeholder: "ادخل اسم البلد" }} attribute='bookOrigin.country.raw' searchable={true} limit={20} />
                </Panel>
              </SubMenu>
              <SubMenu
                defaultOpen={true}
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#087cc4',
                  overflow: 'hidden',
                  borderBottom: 'solid rgb(220, 220, 220)',
                  borderWidth: '2px'
                }}
                label='التصنيف:'
              >
                <Panel>
                  <RefinementList translations={{ placeholder: 'ادخل اسم التصنيف' }} attribute='bookClassification.theclass.key' searchable={true} limit={20} />
                </Panel>
              </SubMenu>
              <div style={{ 'display': 'none' }}>
                {/* <SubMenu style={{display: 'hidden',fontSize:'18px',fontWeight:'700',color:'#087cc4',overflow: 'hidden', borderBottom:'solid rgb(220, 220, 220)', borderWidth:'2px'}} label='الفئة:'>
                <Panel>
                  <RefinementList attribute='bookCategory.thecategory.key'  defaultRefinement={[`${categoryName}`]} searchable={true} limit={20} />
                </Panel>
                </SubMenu> */}
              </div>
              <SubMenu
                defaultOpen={true}
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#087cc4',
                  overflow: 'hidden',
                  borderBottom: 'solid rgb(220, 220, 220)',
                  borderWidth: '2px'
                }}
                label='المؤلف:'
              >
                <Panel>
                  <RefinementList translations={{ placeholder: "ادخل اسم المؤلف" }} attribute='author.name.key' searchable={true} limit={20} />
                </Panel>
              </SubMenu>
            </Menu>
          </Sidebar>
          {/* Right Panel */}
          <div className="right-panel">
            <div className="Cat--div">
              <h2>{categoryName}</h2>
            </div>
            <Configure filters={`bookCategory.thecategory.key:${categoryName}`} hitsPerPage={15} />
            <Hits hitComponent={hitView} />
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </div>
    )
}
