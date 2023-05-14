import React from "react";
import { useParams } from "react-router-dom";



export default function UserInfo(){
    const [userDetails, setUserDetails] = React.useState({})
    const [collapseFavourites, setCollapseFavourites] = React.useState(false)
    const [collapseSubmitted, setCollapseSubmitted] = React.useState(false)
    const [collapseViewed, setCollapseViewed] = React.useState(false)
    const [collapseDownloaded, setCollapseDownloaded] = React.useState(false)
    const params = useParams();
    React.useEffect(function(){
        fetch('/userinfodetails/' + params.id)
        .then(res => res.json())
        .then(data => {
            setUserDetails(data)
      
        })
    },[])
    console.log(collapseSubmitted)
    const approvedCountries = userDetails.approvedcountries?.map(country =>{
        return(
            <span style={{paddingRight: '5px'}}>{country.country}.</span>
        )
    })

    const approvedCategories = userDetails.approvedcategories?.map(category =>{
        return(
            <span style={{paddingRight: '5px'}}>{category.thecategory}.</span>
        )
    })
    const favouriteEntries = userDetails.favouriteEntries?.map(entry =>{
        const direct =`/entry/${entry.id}`
        return(
            <div className="Au--entry--div">
                <div >
                    <img className="Au--entryCover" src={entry.entryCover} />
                </div>
                <div className="Au--entry--info">
                    <a href={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{entry.title}</div></a>
                </div> 
            </div>
        )
    })

    const downloadedEntries = userDetails.downloadedEntries?.map(entry =>{
        const direct =`/entry/${entry.id}`
        return(
            <div className="Au--entry--div">
                <div >
                    <img className="Au--entryCover" src={entry.entryCover} />
                </div>
                <div className="Au--entry--info">
                    <a href={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{entry.title}</div></a>
                </div> 
            </div>
        )
    })
    
    const viewedEntries = userDetails.viewedEntries?.map(entry =>{
        const direct =`/entry/${entry.id}`
        return(
            <div className="Au--entry--div">
                <div >
                    <img className="Au--entryCover" src={entry.entryCover} />
                </div>
                <div className="Au--entry--info">
                    <a href={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{entry.title}</div></a>
                </div> 
            </div>
        )
    })

    const submittedEntries = userDetails.submittedEntries?.map(entry =>{
        const direct =`/entry/${entry.id}`
        return(
            <div className="Au--entry--div">
                <div >
                    <img className="Au--entryCover" src={entry.entryCover} />
                </div>
                <div className="Au--entry--info">
                    <a href={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{entry.title}</div></a>
                </div> 
            </div>
        )
    })
    return (
        <div>
            <div>
                <h2>معلومات عن المستخدم:</h2>
                <p><span>اسم المستخدم:</span>{userDetails.user?.username}</p>
                <p><span> الرقم التعريفي:</span>{userDetails.user?.id}</p>
                <p><span> الإيميل :</span>{userDetails.user?.email}</p>
            
                <p><span> تاريخ اخر تحديث :</span>{userDetails.lastPaid}</p>
                <p><span> قيمة اخر تحديث   :</span>{userDetails.lastPaid}</p>

                <p><span> محرر  :</span>{userDetails.is_admin ? 'نعم' : "لا"}</p>
            </div>
            <div>
                <h2>الإتاحة:</h2>
                <p><span> البلاد:</span>{approvedCountries}</p>
                <p><span> الفئات:</span>{approvedCategories}</p>
            </div>
            <div>
                <h2>تاريخ البحث:</h2>
                <div className='UI--searchhistory' onClick={() => {setCollapseSubmitted(!collapseSubmitted)}} ><h3>المقالات التي تم نشرها (للمحرين فقط): </h3></div>
                <div style={{display : collapseSubmitted? 'block': 'none' }}>{submittedEntries}</div>
                <div className='UI--searchhistory' onClick={() => {setCollapseFavourites(!collapseFavourites)}} ><h3>المفضلة: </h3></div>
                <div style={{display : collapseFavourites? 'block': 'none' }}>{favouriteEntries}</div>
                <div className='UI--searchhistory' onClick={() => {setCollapseDownloaded(!collapseDownloaded)}}><h3>المقالات التي تم تنزيلها: </h3></div>
                <div style={{display : collapseDownloaded? 'block': 'none' }}>{downloadedEntries}</div>
                <div className='UI--searchhistory' onClick={() => {setCollapseViewed(!collapseViewed)}}><h3>المقالات التي تم عرضها: </h3></div>
                <div style={{display : collapseViewed? 'block': 'none' }}>{viewedEntries}</div>
            </div>
        </div>
    )
}