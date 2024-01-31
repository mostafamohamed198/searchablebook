import React, { useRef, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons' 
import SimpleSlider from "../components/SimpleSlider";
import ReactTags from 'react-tag-autocomplete';
import SearchContext from "../ctx/SearchContext";

export default function LandingPage(){
  const reactTags = useRef()
  const [displayTable, setDisplayTable] = React.useState(false)
  let {tags, onAddition, onDelete, onInput, suggestions, searchFormSubmit, resetSearch} = useContext(SearchContext)

  React.useEffect(function(){
    resetSearch()
  }, [])
  const tableStyle = {
   
    display: displayTable ? 'block': 'none',

  }
    return (
        <div className="LP">
            <div  className="SR--searchbox">
                <div style={{width:'95%', textAlign:'right', fontSize:'30px', fontWeight:'700'}} >ابحث في المكتبة القانونية الإلكترونية:</div>
                <form className="SR--searchBox-form" onSubmit={searchFormSubmit}>
                    <div style={tableStyle} className="LP--table--div">
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
                    <button className="SR--searchBox--button" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} /></button>
                </form>
            </div>
   
            <div className='LP--SS'>
                <h2>أحدث الكتب</h2>
                <SimpleSlider catid={1} />
                <h2>أحدث المقالات</h2>
                <SimpleSlider catid={4} />
                <h2>تعرف على بعض ناشرينا الرئيسيين</h2>
            </div>
        </div>
    
  
    
      
         )
}