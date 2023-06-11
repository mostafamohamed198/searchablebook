
import React from "react";
import Select from 'react-select';
import axios from "axios";

import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";
import {Route, Link, Routes, useParams} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../authentication/AuthContext';

export default function BookEditForm(){
    let {authTokens} = useContext(AuthContext)
    const params = useParams();
    const [values, setValues] = React.useState({})
   const [authorOptions, setAuthorOptions] = React.useState([]);
    const [classificationOptions, setClassificationOptions] = React.useState([])
    const [entryClass, setEntryClass] =React.useState([])
    const [containsParts, setContainsParts] = React.useState(false)
    const [containsDoors, setContainsDoors] = React.useState(false)
    const [categoriesOptions, setCategoriesOptions] = React.useState([])
    const [id, setId] = React.useState(0)
    const [submittedDisplay, setSubmittedDisplay]=React.useState(false)
    const [partDisplay, setPartDisplay] = React.useState(false)
    const [formDisplay, setFormDisplay] = React.useState(true)
    const [countryOptions,setCountryOptions] = React.useState([])
    const [categoryLabel, setCategoryLabel]= React.useState(true)
    const [classArray,setClassArray]= React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    React.useEffect (function(){
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

        fetch(`/bookdetail/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setValues(data)
            setCategoryLabel(false)
         
        })

        fetch('/countries')
        .then(res => res.json())
        .then(data => {
            data.map(country=> {
           let newCountry = {value: `${country.id}`, label: `${country.country}`}  
           setCountryOptions(oldArray => [...oldArray, newCountry]) 
        })
        })
    
    }, [])
    const handleCategoryChange =(selectedOption) =>{
        setValues(values => ({...values, 'bookCategory': selectedOption.value}))
        
      }

const { register, handleSubmit,control, watch, formState: { errors } } = useForm({
    // defaultValues: !categoryLabel && values
    // defaultValues: {
    //     bookClassification: [],
    //     author: []
    // }
   
  });
 
  const styles ={
    part:{
        display: partDisplay? 'block': 'none'
    },
    book:{
        display: formDisplay? 'block': 'none',
        margin:'20px'
    },
    submitted:{
        display: submittedDisplay? 'block': 'none'
    }

  }
//   let form_data = new FormData();
          const onSubmit= (data) => {            // event.preventDefault()
            if (data.bookClassification != null ){
          let classArray = []
        data.bookClassification.map(option => {
            classArray.push(parseInt(option.value))
        //    classArray.push(newValue)
            // setClassArray([...classArray, newValue])
        })
        axios.put(`/bookchange/${values.id}/`,{
            bookClassification: classArray
        },{headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization':'Bearer ' + String(authTokens.access)
        }}
        )
    }
    
    if (data.author != null){ 
        let authArray = []
        data.author.map(option => {
            let newValue = parseInt(option.value)
          authArray.push(newValue)
        })
        axios.put(`/bookchange/${values.id}/`,{
            author: authArray
        }, {headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization':'Bearer ' + String(authTokens.access)
        }})
     }
   
         let form_data = new FormData();
        if (data.cover[0] != null){
         form_data.append('cover', data.cover[0], data.cover[0].name);
    }
        if (data.name !== "undefined" && data.name !== ''){
        form_data.append('name', data.name);}
        if(data.containsParts != null){
        form_data.append('containsParts', data.containsParts);
    }

    if(data.containsDoors != null){
        form_data.append('containsDoors', data.containsDoors);
    }
    if(data.publicationDate != null){
        form_data.append('publicationDate', data.publicationDate);
    }
        if (data.bookCategory != null){
        form_data.append('bookCategory', data.bookCategory.value);
        }
  
    if(data.bookOrigin != null){
        form_data.append('bookOrigin', data.bookOrigin.value);
    }
     
            axios.put(`/bookchange/${values.id}/`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
          }).then(res => {
             
          }).catch(err => {
             
          })
        
        //    data.containsParts?  setPartDisplay(true) : setSubmittedDisplay(true)
            setFormDisplay(false)
            setSubmittedDisplay(true)
          }

        //   this.categorylabel = {label: `${values.bookCategory?.thecategory}`, value: values.bookCategory?.id }
        
    return(
        <div>
            <form style={styles.book}onSubmit={handleSubmit(onSubmit)}>
                <h2>تعديل الكتاب :</h2>
                <div>
                
                    <label className="inputLabel">
                       اسم الكتاب:
                        <input defaultValue={values.name}  className="inputForm" type="text" {...register("name", { required: false })}/>
                    </label>
                    {/* {errors.name && <span>This field is required</span>} */}
                </div>
                <div>
                             {/* {errors.author && <span>This field is required</span>} */}
                </div>
                <div>

 
                {/* <Controller
                name="bookCategory"
                control={control}
                rules={{ required: false }}
                render={({ field }) =>  */}
                {!categoryLabel &&  <div>
                    <h4>المؤلفون:</h4>
                <Controller
                name="author"
                key={4}
                rules={{ required: false }}
                control={control}
                render={({ field }) => 
                <Select
                    isMulti
                    {...field}
                    options={authorOptions}
                    defaultValue={values.author}
                    />
            }
            />
               <div>
                    <h4>فئة الكتاب:</h4>
                <Controller
                name="bookCategory"
                key={1}
                control={control}
                rules={{ required: false }}
                render={({ field }) => <Select 
                {...field} 
                options={categoriesOptions}
                defaultValue={{label: `${values.bookCategory?.thecategory}`, value: values.bookCategory?.id}}
                />}
            />
                     </div>
             
            
                <div>
                    <h4>تصنيف الكتاب:</h4>
                <Controller
                name="bookClassification"
                key={2}
                control={control}
                rules={{ required: false }}
                render={({ field }) => 
                <Select
                    isMulti
                    defaultValue={values.bookClassification}
                    {...field} 
                   options={classificationOptions}
                        />
            
            }
            />
            
                </div>
                
                <h4>الدولة:</h4>
                <Controller
                key={3}
                name="bookOrigin"
                control={control}
                rules={{ required: false }}
                render={({ field }) => 
             
                <Select
                {...field}
                options={countryOptions}
                defaultValue={{label: `${values.bookOrigin?.country}`, value: values.bookOrigin?.id}}
        
                    />
            
            }
            />

<div>
                    <label className="inputLabel">
                        يحتوي علي أجزاء
                        <Controller
                        name="containsParts"
                        control={control}
                        // rules={{ required: false }}
                        render={({ field }) => <Checkbox defaultValue={false} {...field} defaultChecked = {values.containsParts} />}
                    />
                        {/* <input defaultValue={false}  type="checkbox" checked={containsParts}  {...register("containsParts")} name="containsParts"/> */}
                    </label>
                </div>

                <div>
                    <label className="inputLabel">
                        يحتوي علي أبواب
                        <Controller
                        name="containsDoors"
                        control={control}
                        // rules={{ required: false }}
                        render={({ field }) => <Checkbox defaultValue={false} {...field} defaultChecked = {values.containsDoors} />}
                    />
                        {/* <input defaultValue={false} {...register("containsDoors")} type="checkbox" checked={containsDoors} name="containsDoors"/> */}
                    </label>
                </div>

                <div>
                    <label className="inputLabel">
                        تاريخ النشر:
                        <input  {...register("publicationDate", { required: false })}type="date" name="publicationDate" defaultValue={values.publicationDate}/>
                    </label>
                    {errors.publicationDate && <span>This field is required</span>}
                </div>
                <div>
                    <label className="inputLabel">غلاف الكتاب  :
                        <input type="file" 
                        name="entryCover"
                        accept="image/jpeg,image/png,image/gif"
                        // defaultValue={values.cover}
                        {...register("cover", { required: false })} />
                    </label>
                    {/* {errors.cover && <span>This field is required</span>} */}
                </div>
                </div>}
              
                     </div>
                
                <div>
           

                  
                </div>
                
               
               
      
                <div>
                    <input type="submit" />
                </div>
            </form>
            
        
                <div style={styles.submitted} >
                    <h1>تم إدخال الكتاب بنجاح</h1>
                </div>
  
        </div>
    )
}