
import React from "react";
import Select from 'react-select';
import axios from "axios";
import PartForm from "./PartForm";
import { useContext } from "react";
import AuthContext from "../../authentication/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";

export default function BookForm(){
    let {authTokens, logoutUser} = useContext(AuthContext)
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

        fetch('/countries')
        .then(res => res.json())
        .then(data => {
            data.map(country=> {
           let newCountry = {value: `${country.id}`, label: `${country.country}`}  
           setCountryOptions(oldArray => [...oldArray, newCountry]) 
        })
        })
    }, [])

const { register, handleSubmit,control, watch, formState: { errors } } = useForm({
    defaultValues: {
        containsParts: false,
      containsDoors: false,
     
   
    }
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


          const onSubmit= (data) => {
         
            // event.preventDefault()

        let classArray = []
        data.bookClassification.map(option => {
          classArray.push(option.value)
        })

        let authArray = []
        data.author.map(option => {
          authArray.push(option.value)
        })
            let form_data = new FormData();
           
        form_data.append('cover', data.cover[0], data.cover[0].name);
        form_data.append('name', data.name);
        form_data.append('containsParts', data.containsParts);
        form_data.append('containsDoors', data.containsDoors);
        // form_data.append('author', authArray);
        form_data.append('publicationDate', data.publicationDate);
        form_data.append('bookCategory', data.bookCategory.value);
        // form_data.append('bookClassification', classArray);
        form_data.append('bookOrigin', data.bookOrigin.value);
 
            axios.post('/postbook/', form_data, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization':'Bearer ' + String(authTokens.access)
              }
          })
        
          
          .then(res => {
           
              setId(res.data.id)
            //   .then(
                axios.put(`/bookchange/${res.data.id}/`,{
                  bookClassification: classArray,
                  author: authArray
              },{
              headers: {
                  'Authorization':'Bearer ' + String(authTokens.access)
            }}
          
            //   )
       )

          }).catch(err => {
          
          })
        
        
           data.containsParts?  setPartDisplay(true) : setSubmittedDisplay(true)
            setFormDisplay(false)
            setContainsDoors(data.containsDoors)
          }
        
    return(
        <div>
            <form style={styles.book}onSubmit={handleSubmit(onSubmit)}>
                <h2>أضف كتاب جديد:</h2>
                <div>
                
                    <label className="inputLabel">
                        اسم الكتاب:
                        <input className="inputForm" type="text" {...register("name", { required: true })}/>
                    </label>
                    {errors.name && <span>This field is required</span>}
                </div>
                <div>
                    <h4>المؤلفون:</h4>
                <Controller
                name="author"
                rules={{ required: true }}
                control={control}
                render={({ field }) => 
                <Select
                    isMulti
                    {...field}
                    options={authorOptions}
                    />
            }
            />
            {errors.author && <span>This field is required</span>}
                </div>
                <div>
                    <h4>فئة الكتاب:</h4>
                <Controller
                name="bookCategory"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Select 
                {...field} 
                options={categoriesOptions}
                />}
            />
             {errors.bookCategory && <span>This field is required</span>}
                    </div>
                <div>
                    <h4>تصنيف الكتاب:</h4>
                <Controller
                name="bookClassification"
                control={control}
                rules={{ required: true }}
                render={({ field }) => 
                <Select
                    isMulti
                    {...field} 
                   options={classificationOptions}
                        />
            
            }
            />
            {errors.bookClassification && <span>This field is required</span>}

                  
                    
                </div>
                <div>
                    <h4>الدولة:</h4>
                <Controller
                name="bookOrigin"
                control={control}
                rules={{ required: true }}
                render={({ field }) => 
             
                <Select
                {...field}
                options={countryOptions}        
                    />
            
            }
            />
             {errors.bookOrigin && <span>This field is required</span>}
                   

                  
                </div>
                <div>
                    <label className="inputLabel">
                        يحتوي علي أجزاء
                        <Controller
                        name="containsParts"
                        control={control}
                        // rules={{ required: true }}
                        render={({ field }) => <Checkbox defaultValue={false} {...field} />}
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
                        // rules={{ required: true }}
                        render={({ field }) => <Checkbox defaultValue={false} {...field} />}
                    />
                        {/* <input defaultValue={false} {...register("containsDoors")} type="checkbox" checked={containsDoors} name="containsDoors"/> */}
                    </label>
                </div>
                <div>
                    <label className="inputLabel">
                        تاريخ النشر:
                        <input  {...register("publicationDate", { required: true })}type="date" name="publicationDate"/>
                    </label>
                    {errors.publicationDate && <span>This field is required</span>}
                </div>
                <div>
                    <label className="inputLabel">غلاف الكتاب  :
                        <input type="file" 
                        name="entryCover"
                        accept="image/jpeg,image/png,image/gif"
                        {...register("cover", { required: true })} />
                    </label>
                    {errors.cover && <span>This field is required</span>}
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
            
        
                <div style={styles.submitted} >
                    <h1>تم إدخال الكتاب بنجاح</h1>
                </div>
                <div style={styles.part}>
            <PartForm containsDoors= {containsDoors} id={id} />
            </div>
        </div>
    )
}