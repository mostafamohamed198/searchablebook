import React from "react";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import Pagination from 'rc-pagination';

export default function Author(){
    const params = useParams();
    const [name, setName] = React.useState('')
    const [degree, setDegree] = React.useState('')
    const [about, setAbout] = React.useState('')
    const [picture, setPicture] = React.useState('')
    const [relatedEntries, setRelatedEntries] = React.useState([])
    const [categories, setCategories] = React.useState([])
    const [perPage, setPerPage] = React.useState(4);
    const [size, setSize] = React.useState(perPage);
    const [current, setCurrent] = React.useState(1);
    

    React.useEffect(function(){
        fetch('/api/thesearchable/auth_info/' + params.theauthid)
        .then(res => res.json())
        .then(data => {
            setRelatedEntries(data.relatedEntries);
            setName(data.name)
            setDegree(data.degree)
            setAbout(data.about)
            setPicture(data.picture)
            setCategories(data.categories)
        })
    },[params.theauthid])

    const categoriesdiv = categories.map(category =>{
        const categoryid = `/category/${category.catid}`
        return(   
            <div >
                <Link to={categoryid}style={{marginLeft:'8px', color:'#087cc4'}}>{category.entryCategory}  </Link>
            </div>
        )
    })

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(relatedEntries.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        // Normally you should get the data from the server
        return relatedEntries.slice((current - 1) * pageSize, current * pageSize);
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
    
    return(
        <div className="Au--container">
            <div className="Au--img--cont">
                <img src={picture} />
            </div>
            <div className="Au--info--cont">
                <div className="Au--name">{name}</div>
                <div className="Au--degree"><span style={{fontWeight:'700'}}>الدرجه العلميه: </span>{degree}</div>
                <div className="Au--categories--div Au--degree"><span style={{fontWeight:'700', marginLeft:'5px'}}>التصنيفات:  </span>{categoriesdiv}</div>
                <div className="Au--about">{about}</div>
                <div className="Au--participation">المنشورات التي شارك فيها {name} :</div>
           
                <div>
                    {
                        getData(current, size).map((data, index) => {
                            const direct = `/entry/${data.id}`
                            return (
                               <div className="Au--entry--div">
                                    <div >
                                        <img className="Au--entryCover" src={data.entryCover} />
                                    </div>
                                    <div className="Au--entry--info">
                                    <p className="SR--category" style={{textDecoration:'none', color:'rgb(103, 103, 103)', fontWeight:'400'}}>{data.entryCategory.thecategory}</p>
                                        <Link to={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{data.title}</div></Link>
                                        <div style={{fontSize:'14px', color:'rgb(103, 103, 103)'}} className="SR--pubdate">
                                        <p className="SR--pubdate--title">تاريخ الإصدار:</p >
                                        <div >{data.entryPubDate}</div>
                                        </div>
                                    </div> 
                                </div>
                            )
                        })
                    }
                </div>
                <Pagination
                    className="pagination-data"
                    onChange={PaginationChange}
                    total={relatedEntries.length}
                    current={current}
                    pageSize={size}
                    showSizeChanger={false}
                    itemRender={PrevNextArrow}
                    onShowSizeChange={PerPageChange}
                />
           </div>
        </div>
        
    )
}