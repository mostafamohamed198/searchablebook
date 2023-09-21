import React from "react";
import { useParams , Link } from "react-router-dom";

import axios from "axios";
import { useContext } from "react";
import AuthContext from "../authentication/AuthContext";


export default function UserInfo(props){
    let {authTokens} = useContext(AuthContext)
    const [userDetails, setUserDetails] = React.useState({})
    const [collapseSubmittedEntries, setCollapseSubmittedEntries] = React.useState(false)
    const [collapseSubmittedAuthors, setCollapseSubmittedAuthors] = React.useState(false)
    const [collapseSubmittedBooks, setCollapseSubmittedBooks] = React.useState(false)
    React.useEffect(function(){
        fetch('/api/thesearchable/userinfodetails/' + props.id)
        .then(res => res.json())
        .then(data => {
            setUserDetails(data)
      
        })
    },[])
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
                    <Link href={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{entry.title}</div></Link>
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

    const submittedEntries = userDetails.submittedentries?.map(entry =>{
        const direct =`/entry/${entry.id}`
        const edit = `/editform/${entry.id}`
        function deleteEntry(){
            alert('هل أنت متأكد من مسح المحتوي؟ ')
            axios.delete(`/api/thesearchable/entrychange/${entry.id}/`,
            {headers: {
               'Authorization':'Bearer ' + String(authTokens.access)
          }}
            )
        }
        return(
            <div className="Au--entry--div">
                <div >
                    <img className="Au--entryCover" src={entry.entryCover} />
                </div>
                <div className="Au--entry--info">

                    <Link to={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{entry.title}</div></Link>
                    <div className="edit-delete"><Link to={edit}>تعديل</Link> | <span onClick={() => deleteEntry()}>مسح</span></div>
                </div> 
            </div>
        )
    })

    const submittedAuthors = userDetails.submittedAuthors?.map(author =>{
        const direct =`/authordetails/${author.id}`
        const edit = `/editauthor/${author.id}`

        function deleteAuthor(){
            alert('هل أنت متأكد من مسح المحتوي؟ ')
            axios.delete(`/api/thesearchable/authorchange/${author.id}/`,
            {headers: {
               'Authorization':'Bearer ' + String(authTokens.access)
          }}
            )
        }
        return(
            <div className="Au--entry--div">
                <div >
                    <img className="Au--entryCover" src={author.authorPicture} />
                </div>
                <div className="Au--entry--info">
                    <Link to={direct} style={{textDecoration:'none', color:'#087cc4'}}><div>{author.name}</div></Link>
                    <div className="edit-delete"><Link to={edit}>تعديل</Link>| <span onClick={() => deleteAuthor()}>مسح</span></div>
                </div> 
            </div>
        )
    })

    const submittedBooks = userDetails.submittedBooks?.map(book =>{
        const edit = `/editbook/${book.id}`
        function deleteBook(){
            alert('هل أنت متأكد من مسح المحتوي؟ ')
            axios.delete(`/api/thesearchable/bookchange/${book.id}/`,
            {headers: {
               'Authorization':'Bearer ' + String(authTokens.access)
          }}
            )
        }
        return(
            <div className="Au--entry--div">
                <div >
                    <img className="Au--entryCover" src={book.bookCover} />
                </div>
                <div className="Au--entry--info">
                    <a style={{textDecoration:'none', color:'#087cc4'}}><div>{book.name}</div></a>
                    <div className="edit-delete"><Link to={edit}>تعديل</Link>| <span onClick={() => deleteBook()}>مسح</span></div>
                </div> 
            </div>
        )
    })
    const editUrl = `/useredit/${userDetails.user?.id}`
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
                <div className='UI--searchhistory' onClick={() => {setCollapseSubmittedEntries(!collapseSubmittedEntries)}} ><h3>المقالات التي تم نشرها (للمحرين فقط): </h3></div>
                <div style={{display : collapseSubmittedEntries? 'block': 'none' }}>{submittedEntries}</div>
                <div className='UI--searchhistory' onClick={() => {setCollapseSubmittedBooks(!collapseSubmittedBooks)}} ><h3>الكتب التي تم نشرها (للمحرين فقط): </h3></div>
                <div style={{display : collapseSubmittedBooks? 'block': 'none' }}>{submittedBooks}</div>
                <div className='UI--searchhistory' onClick={() => {setCollapseSubmittedAuthors(!collapseSubmittedAuthors)}} ><h3>المؤلفون الذين تم نشرهم (للمحرين فقط): </h3></div>
                <div style={{display : collapseSubmittedAuthors? 'block': 'none' }}>{submittedAuthors}</div>
                {/* <div className='UI--searchhistory' onClick={() => {setCollapseFavourites(!collapseFavourites)}} ><h3>المفضلة: </h3></div>
                <div style={{display : collapseFavourites? 'block': 'none' }}>{favouriteEntries}</div>
                <div className='UI--searchhistory' onClick={() => {setCollapseDownloaded(!collapseDownloaded)}}><h3>المقالات التي تم تنزيلها: </h3></div>
                <div style={{display : collapseDownloaded? 'block': 'none' }}>{downloadedEntries}</div>
                <div className='UI--searchhistory' onClick={() => {setCollapseViewed(!collapseViewed)}}><h3>المقالات التي تم عرضها: </h3></div>
                <div style={{display : collapseViewed? 'block': 'none' }}>{viewedEntries}</div> */}
            </div>
            <Link to={editUrl}>تعديل بيانات المستخدم</Link>
        </div>
    )
}