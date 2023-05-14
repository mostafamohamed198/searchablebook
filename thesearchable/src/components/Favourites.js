import React from "react";
import Pagination from 'rc-pagination';

export default function Favourites(){
    const [userFavouriteEntries, setUserFavouriteEntries] = React.useState([])
    const [perPage, setPerPage] = React.useState(10);
    const [size, setSize] = React.useState(perPage);
    const [current, setCurrent] = React.useState(1);
    
    React.useEffect(function(){
        fetch('/favouriteEntries/')
        .then(res => res.json())
  .then(data => {
        setUserFavouriteEntries(data)
        console.log(data)
  })
    },[])


        const PerPageChange = (value) => {
            setSize(value);
            const newPerPage = Math.ceil(userFavouriteEntries.length / value);
            if (current > newPerPage) {
                setCurrent(newPerPage);
            }
        }
    
        const getData = (current, pageSize) => {
            // Normally you should get the data from the server
            return userFavouriteEntries.slice((current - 1) * pageSize, current * pageSize);
        };
    
        const PaginationChange = (page, pageSize) => {
            setCurrent(page);
            setSize(pageSize)
        }
    
        const PrevNextArrow = (current, type, originalElement) => {
            if (type === 'prev') {
                return <button><i className="fa fa-angle-double-left"></i></button>;
            }
            if (type === 'next') {
                return <button><i className="fa fa-angle-double-right"></i></button>;
            }
            return originalElement;
        }
    const favouritesList = getData(current, size).map(entry => {
        const resultingAuthors = entry.entryauthor.map(author => {
            const authid= `/authordetails/${author.id}`
            return (
                <a href={authid}><div>{author.name}،</div></a>
            )
        })
        const entryLink = `/entry/${entry.id}/`

        return(
            <div className="ais-Hits-item">
            <div  className="SR--container">
      <div>
        <img src={entry.entryCover} style={{width:'85px', height:'120px'}}/>
        </div>
        <div className="SR--content">
        <p className="SR--category">{entry.entryCategory.thecategory}</p>
        <a style={{textDecoration: 'none'}} href={entryLink}><h2 style={{color:'#087cc4'}}>{entry.title}</h2></a>
        <div className="SR--authors--div">
            <p className="SR--authors--title">المؤلفون:</p> 
         <div className="SR--authors--names">
            {resultingAuthors}
         </div>
        </div>
        <div className="SR--pubdate">
          <p className="SR--pubdate--title">تاريخ الإصدار:</p >
          <div>{entry.entryPubDate}</div>
        </div>
        
        </div>
      </div>
      </div>
        )
    })
    // console.log(userFavouriteEntries)
    return (
        <div className="favourites--div">
              <div className="Cat--div">
                <h2>قائمة المفضلات:</h2>
    
               </div>
            {favouritesList}
            <Pagination
                    className="pagination-data"
                    onChange={PaginationChange}
                    total={userFavouriteEntries.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                />
        </div>
    )
}


