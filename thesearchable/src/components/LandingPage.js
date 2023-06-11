import React, { Component, useContext,useState } from "react";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons' 
import SimpleSlider from "./SimpleSlider";
import SearchResults from "./SearchResults";


export default function LandingPage(){
  const [value, setValue] = React.useState('')
  const [message, setMessage] = React.useState(''); 
  const [displayTable, setDisplayTable] = React.useState(false)
  const tableStyle = {
    position:'absolute',
    top: '500px',
    minWidth:'300px',
    maxWidth: '60%',
    backgroundColor: 'white',
    display: displayTable ? 'block': 'none',
    zIndex:'10'
  }
  const navigate = useNavigate();
const handleChange = (event) => {
  setValue(event.target.value);
};

 const handleSubmit = event => {
    event.preventDefault();
   if (value == ''){
    alert ('من فضلك ادخل صيغة البحث')
   }
   else{
    // 👇️ redirect to /contacts
    navigate(`/results/${value}/`);
  }
  };



    return (
<div className="LP">

      <div className="LP--search--div">
        <div className="LP--search--title">العنوان</div>
        <div className="LP--search--slogan">هذه هي الجمله التي سوف تكون تحت العنوان</div>
      <form onSubmit={handleSubmit} className="LP--searchBox">
        
        <input onChange={handleChange} 
        onFocus={() => setDisplayTable(true)}
        onBlur={() => setDisplayTable(false)} type='text' className="LP--SB--input"/>
        <button className="LP--SB--button"><FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} /></button>
      </form>
      {/* className="SR--table--div" */}
      <div style={tableStyle} >
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
      <div>
      <div class="indexoptions">

<div class="theindexoption">
  <div>
  <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} className='iconsoptions'/>
</div >
<p class="optionheading">بحث</p>
<p class="optionpar" >قم بالبحث عن مختلف الكتب والمراجع والمقلات عن جميع التخصصصات</p>

</div>


<div  class="theindexoption">
  <div>
  <FontAwesomeIcon icon={faBookOpen} className='iconsoptions'/>
</div>
<p class="optionheading">اطلاع</p>
<p class="optionpar">قم بالاضطلاع علي اخر الكتب والمقالات </p>
</div>

<div class="theindexoption">
  <div>
  <FontAwesomeIcon icon={faUser} className='iconsoptions'/>
</div>
<p class="optionheading">كتاب</p>
<p class="optionpar"> يمكنك عرض أعمال كل كاتب </p>
</div>


</div>
      </div>
      <div className='LP--SS'>
      <h2>أحدث الكتب</h2>
      <SimpleSlider catid={1} />
      <h2>أحدث المقالات</h2>
      <SimpleSlider catid={4} />
      </div>
      </div>
    
  
    
      
         )
}