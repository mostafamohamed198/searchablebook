import React, { useRef,useCallback, useContext,useState } from "react";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons' 
import SimpleSlider from "../components/SimpleSlider";
import ReactTags from 'react-tag-autocomplete';
import axios from "axios";

export default function LandingPage(){
  const [searchBoxValue, setSearchBoxValue] = React.useState('')
  const [tags, setTags] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const reactTags = useRef()
  const [displayTable, setDisplayTable] = React.useState(false)
  const tableStyle = {
   
    display: displayTable ? 'block': 'none',

  }
  const navigate = useNavigate();
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
    const al = `${tags}`
    navigate(`/results/${thestring}`);

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