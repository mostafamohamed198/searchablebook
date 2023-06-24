
import React from "react";
import Select from 'react-select'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../authentication/AuthContext';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useNavigate } from "react-router-dom";
export default function FormEdit(){
  const navigate = useNavigate()
    let {authTokens} = useContext(AuthContext)
    const params = useParams();
    const [values,setValues] = React.useState({})
    const [inputs, setInputs] = React.useState({});
    const [authorOptions, setAuthorOptions] = React.useState([]);
    const [countryOptions, setCountryOptions] = React.useState([])
    const [categoriesOptions, setCategoriesOptions] = React.useState([])
    const [classificationOptions, setClassificationOptions] = React.useState([])
    const [formDisplay, setFormDisplay] = React.useState(true)
    const [submittedDisplay, setSubmittedDisplay] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
  
    React.useEffect (function(){
        fetch(`/entrieseditdata/${params.id}/`)
        .then(res => res.json())
        .then(data => {
            setValues(data)
            setLoaded(true)
        })
        fetch('/author')
        .then(res => res.json())
        .then(data => {
            // let authorsArray = []
            data.map(author => {
           let newAuthor = {value: `${author.id}`, label: `${author.name}`}  
        //    authorsArray.push(newAuthor)
           setAuthorOptions(oldArray => [...oldArray, newAuthor]) 
        })
        })
        fetch('/countries')
        .then(res => res.json())
        .then(data => {
            data.map(country=> {
           let newCountry = {value: `${country.id}`, label: `${country.country}`}  
           setCountryOptions(oldArray => [...oldArray, newCountry]) 
        })
        })
        fetch('/categories')
        .then(res => res.json())
        .then(data => {
            data.map(category=> {
           let newCategory = {value: `${category.id}`, label: `${category.thecategory}`}  
           setCategoriesOptions(oldArray => [...oldArray, newCategory]) 
        })
        })

        fetch('/classification')
        .then(res => res.json())
        .then(data => {
            data.map(theclass => {
           let newClass = {value: `${theclass.id}`, label: `${theclass.theclass}`}  
           setClassificationOptions(oldArray => [...oldArray, newClass]) 
        })
        })
    },[])
    
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    
    
    const styles ={
    
    entry:{
          display: formDisplay? 'block': 'none',
          margin:'20px'
      },
      submitted:{
          display: submittedDisplay? 'block': 'none'
      }
  
    }
    
      const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
    
      const onSubmit = (data) => {
        
        if (data.entryClassification != null){
        let classArray = []
        data.entryClassification.map(option => {
          classArray.push(parseInt(option.value))
        })
        axios.put(`/entrychange/${values.id}/`,{
          entryClassification: classArray
      },
      {headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization':'Bearer ' + String(authTokens.access)
    }}
      )
      }

      if (data.entryauthor != null){
        let authArray = []
        data.entryauthor.map(option => {
          authArray.push(parseInt(option.value))
        })
        axios.put(`/entrychange/${values.id}/`,{
          entryauthor: authArray
      }, 
      {headers: {
        // 'Content-Type': 'multipart/form-data',
        'Authorization':'Bearer ' + String(authTokens.access)
    }}
      )
      }
      

        let form_data = new FormData();
        if (data.entryCover.length != 0){
    form_data.append('entryCover', data.entryCover[0], data.entryCover[0].name);
        }
        if(data.title.length != 0){
    form_data.append('title', data.title);
        }
        if (data.body.length != 0){
    form_data.append('body', data.body);
        }
        if (data.entryOrigin != null){
    form_data.append('entryOrigin', data.entryOrigin.value);
        }
        if (data.entryCategory != null){
    form_data.append('entryCategory', data.entryCategory.value);
        }
        if (data.entryPubDate.length != 0){
    form_data.append('entryPubDate', data.entryPubDate);
        }
        if (data.bibiliography){
    form_data.append('bibiliography', data.bibiliography);
   
        }
        axios.put(`/entrychange/${values.id}/`, form_data, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
      }).then(res => {
     
          alert('edited')
          navigate(`/entry/${params.id}`)
      }).catch(err => {
         
          alert('error')
      })
        
      
      // setFormDisplay(false)
      // setSubmittedDisplay(true)
      }


    return(
      <div style={{margin: '20px'}}>

<form style={styles.entry} onSubmit={handleSubmit(onSubmit)}>
          <h2>تعديل المحتوي: </h2>
        <label className="inputLabel">عنوان المقال :
        <input className="inputForm" type="text" {...register("title", { required: false })} defaultValue={values.title} />
        </label>
        {errors.title && <span>This field is required</span>}
        {/* <div>
        <div className="inputLabel" >محتوي المقال:
          <textarea 
          style={{width:'600px', height:"600px"}}
            type="text" 
            name="body" 
            defaultValue={values.body}
            {...register("body", { required: false })}
          />
          </div>
          {errors.body && <span>This field is required</span>}
          </div> */}
           <div className="content--input--div">
        <div className="inputLabel content--textarea">محتوي المقال:
          <textarea 
          style={{width:'100%', height:"600px"}}
            type="text" 
            name="body" 
            defaultValue={values.body}
            // onChange={(e) => setValue("body", e.target.value)}
            {...register("body", { required: false})}
            onChange={(e) => {handleChange(e)}}
          />
          {errors.body && <span>This field is required</span>}
 
          </div>
          <ReactMarkdown className="SE--markdown--content markdown--input" rehypePlugins={[rehypeRaw, remarkGfm]} children={inputs.body} remarkPlugins={[remarkGfm]} />
           </div>
     {loaded && 
     <div>
             
       <div className="inputLabel">المؤلفون:</div>
          <Controller
                name="entryauthor"
                rules={{ required: false }}
                control={control}
                render={({ field }) => 
                <Select
                    isMulti
                    {...field}
                    options={authorOptions}
                    defaultValue= {values.entryauthor}
                    />
            }
            />
            {errors.entryauthor && <span>This field is required</span>}
     
      <div className="inputLabel">الدولة:</div>
          <Controller
                  name="entryOrigin"
                  rules={{ required: false }}
                  control={control}
                  render={({ field }) => 
                  <Select
                    defaultValue={values.entryOrigin}
                      {...field}
                      options={countryOptions}
                      />
              }
              />
              {errors.entryOrigin && <span>This field is required</span>}

              <div className="inputLabel">التصنيف:</div>
        <Controller
                name="entryClassification"
                rules={{ required: false }}
                control={control}
                render={({ field }) => 
                <Select
                    isMulti
                    {...field}
                    options={classificationOptions}
                    defaultValue={values.entryClassification}
                    />
            }
            />
            {errors.entryClassification && <span>This field is required</span>}
     

            <div className="inputLabel">الفئة:</div>
        <Controller
                name="entryCategory"
                rules={{ required: false }}
                control={control}
                render={({ field }) => 
                <Select
                    defaultValue={values.entryCategory}
                    {...field}
                    options={categoriesOptions}
                    />
            }
            />
            {errors.entryCategory && <span>This field is required</span>}
            <div>
           <label className="inputLabel">غلاف الكتاب  :
          <input type="file" 
          name="entryCover"
          accept="image/jpeg,image/png,image/gif"
          {...register("entryCover", { required: false })} />
      </label>
      {errors.entryCover && <span>This field is required</span>}
     
           </div>
              </div>
 }
 <div >
            <label className="inputLabel">تاريخ النشر :
        <input 
          type="date" 
          name="entryPubDate" 
          defaultValue={values.entryPubDate}
          {...register("entryPubDate", { required: false })}
        />
        </label>
        {errors.entryPubDate && <span>This field is required</span>}
     
        </div>
        <div>
        <label className="inputLabel">المرجع:
          <textarea 
            type="text" 
            name="bibiliography" 
            defaultValue={values.bibiliography}
            {...register("bibiliography", { required: false })}
          />
          </label>
          {errors.bibiliography && <span>This field is required</span>}
     
            </div>
           
          
           <input type="submit" />
      </form>

       
      <div style={styles.submitted} >
                    <h1>تم إدخال المحتوي بنجاح</h1>
                </div>
      </div>
    )
}
