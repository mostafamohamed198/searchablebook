// import React from "react";
// import Select from 'react-select'
// import axios from 'axios';
// import { AxiosInstance } from "axios";

// export default function Form(){
//     const [inputs, setInputs] = React.useState({});
//     const [authorOptions, setAuthorOptions] = React.useState([]);
//     const [countryOptions, setCountryOptions] = React.useState([])
//     const [categoriesOptions, setCategoriesOptions] = React.useState([])
//     const [classificationOptions, setClassificationOptions] = React.useState([])
//     const [selected, setSelected] = React.useState(null);
//     const [selectedFile, setSelectedFile] = React.useState(null);
//     const [entryClass, setEntryClass] =React.useState([])
//     const [entryAuth , setEntryAuth] = React.useState([])
  
//     React.useEffect (function(){
//         fetch('/author')
//         .then(res => res.json())
//         .then(data => {
//             // let authorsArray = []
//             data.map(author => {
//            let newAuthor = {value: `${author.id}`, label: `${author.name}`}  
//         //    authorsArray.push(newAuthor)
//            setAuthorOptions(oldArray => [...oldArray, newAuthor]) 
//         })
//         })
//         fetch('/countries')
//         .then(res => res.json())
//         .then(data => {
//             data.map(country=> {
//            let newCountry = {value: `${country.id}`, label: `${country.country}`}  
//            setCountryOptions(oldArray => [...oldArray, newCountry]) 
//         })
//         })
//         fetch('/categories')
//         .then(res => res.json())
//         .then(data => {
//             data.map(category=> {
//            let newCategory = {value: `${category.id}`, label: `${category.thecategory}`}  
//            setCategoriesOptions(oldArray => [...oldArray, newCategory]) 
//         })
//         })

//         fetch('/classification')
//         .then(res => res.json())
//         .then(data => {
//             data.map(theclass => {
//            let newClass = {value: `${theclass.id}`, label: `${theclass.theclass}`}  
//            setClassificationOptions(oldArray => [...oldArray, newClass]) 
//         })
//         })
//     },[])
    
    
    
//   const handleAuthorsChange = (selectedOption) => {
//     let authArray = []
//     selectedOption.map(option => {
//       authArray.push(option.value)
//     })
//     setEntryAuth(authArray)
//     setInputs(values => ({...values, 'entryAuthor': authArray }))
//   };

//   // console.log('entryauthor' + entryAuth)
//   const handleCountryChange =(selectedOption) =>{
//     setInputs(values => ({...values, 'entryOrigin': selectedOption.value}))
//   }
//   console.log(inputs)


//   const handleCategoryChange =(selectedOption) =>{
//     setInputs(values => ({...values, 'entryCategory': selectedOption.value}))
    
//   }

//   const handleClassificationChange =(selectedOption) =>{    let classArray = []
//     selectedOption.map(option => {
//       classArray.push(option.value)
//     })
//     setEntryClass(classArray)
//     setInputs(values => ({...values, 'entryClassification': classArray }))
//   }

//   const handleImageChange = (e) => {
//     console.log(e.target.files[0])
//     let image = e.target.files[0]
//     setInputs(values => ({...values,'entryCover' : image}))

// };
    
//     // console.log('working')
//     const handleChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({...values, [name]: value}))
      
//       }
    
//       const handleSubmit = (event) => {

//         event.preventDefault()
//         let form_data = new FormData();
//     form_data.append('entryCover', inputs.entryCover, inputs.entryCover.name);
//     form_data.append('title', inputs.title);
//     form_data.append('body', inputs.body);
//     form_data.append('entryOrigin', inputs.entryOrigin);
//     form_data.append('entryCategory', inputs.entryCategory);
//     form_data.append('entryPubDate', inputs.entryPubDate);
//     form_data.append('bibiliography', inputs.bibiliography);
//     form_data.append('entryClassification', entryClass),
//     form_data.append('entryauthor', entryAuth)
    
//         // fetch('/entryForm/', {
//         //   method: 'POST',
//         //   body: form_data
//         //   // JSON.stringify(form_data)
//         // })
//         axios.post('/entryForm/', form_data, {
//           headers: {
//               'Content-Type': 'multipart/form-data'
//           }
//       }).then(res => {
//           console.log(res);
//       }).catch(err => {
//           console.log(err.response.data);
//       })
        
//       }


//     return(
//         <form onSubmit={handleSubmit}>
//         <label>عنوان المقال :
//         <input 
//           type="text" 
//           name="title" 
//           value={inputs.title || ""} 
//           onChange={handleChange}
//         />
//         </label>
//         <label>محتوي المقال:
//           <textarea 
//             type="text" 
//             name="body" 
//             value={inputs.body || ""} 
//             onChange={handleChange}
//           />
//           </label>

//         <Select
//    isMulti
//     onChange={handleAuthorsChange}
//     options={authorOptions}
//   />

// <Select
//    onChange={handleCountryChange}
//     options={countryOptions}
//   />

// <Select
//    isMulti
//     onChange={handleClassificationChange}
//     options={classificationOptions}
//   />

// <Select
  
//     onChange={handleCategoryChange}
//     options={categoriesOptions}
//   />
//             <label>تاريخ النشر :
//         <input 
//           type="date" 
//           name="entryPubDate" 
//           value={inputs.entryPubDate || ""} 
//           onChange={handleChange}
//         />
//         </label>
//         <label>المرجع:
//           <textarea 
//             type="text" 
//             name="bibiliography" 
//             value={inputs.bibiliography || ""} 
//             onChange={handleChange}
//           />
//           </label>
//           <label>غلاف الكتاب  :
//           {/* <input
//           type="file"
//           value={selectedFile}
//           onChange={(e) => setSelectedFile(e.target.files[0])}
//           /> */}
//           <input type="file" 
//     name="entryCover"
//     accept="image/jpeg,image/png,image/gif"
//     onChange={(e) => {handleImageChange(e)}} />
//         </label>
//           <input type="submit" />
//       </form>
//     )
// }


import React from "react";
import Select from 'react-select'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";


export default function Form(){
    const [inputs, setInputs] = React.useState({});
    const [authorOptions, setAuthorOptions] = React.useState([]);
    const [countryOptions, setCountryOptions] = React.useState([])
    const [categoriesOptions, setCategoriesOptions] = React.useState([])
    const [classificationOptions, setClassificationOptions] = React.useState([])
    const [selected, setSelected] = React.useState(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [entryClass, setEntryClass] =React.useState([])
    const [entryAuth , setEntryAuth] = React.useState([])
    const [formDisplay, setFormDisplay] = React.useState(true)
    const [submittedDisplay, setSubmittedDisplay] = React.useState(false)
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
    
    const styles ={
    
    entry:{
          display: formDisplay? 'block': 'none',
          margin:'20px'
      },
      submitted:{
          display: submittedDisplay? 'block': 'none'
      }
  
    }
    

  
  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    let image = e.target.files[0]
    setInputs(values => ({...values,'entryCover' : image}))

};
    
    // console.log('working')
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      
      }

      const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
    
      const onSubmit = (data) => {
        let classArray = []
        data.entryClassification.map(option => {
          classArray.push(option.value)
        })

        let authArray = []
        data.entryauthor.map(option => {
          authArray.push(option.value)
        })

        

        let form_data = new FormData();
    form_data.append('entryCover', data.entryCover[0], data.entryCover[0].name);
    form_data.append('title', data.title);
    form_data.append('body', data.body);
    form_data.append('entryOrigin', data.entryOrigin.value);
    form_data.append('entryCategory', data.entryCategory.value);
    form_data.append('entryPubDate', data.entryPubDate);
    form_data.append('bibiliography', data.bibiliography);
    // form_data.append('entryClassification', classArray),
    // form_data.append('entryauthor', authArray)
    
  
        axios.post('/entryForm/', form_data, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }).then(res => {
          console.log(res);
          axios.put(`/entrychange/${res.data.id}/`,{
            entryauthor: authArray,
            entryClassification: classArray
        })
      }).catch(err => {
          console.log(err.response.data);
      })
        

      setFormDisplay(false)
      setSubmittedDisplay(true)
      }


    return(
      <div style={{margin: '20px'}}>
        <form style={styles.entry} onSubmit={handleSubmit(onSubmit)}>
          <h2>أضف محتوي جديد:</h2>
        <label className="inputLabel">عنوان المقال :
        <input className="inputForm" type="text" {...register("title", { required: true })}/>
        </label>
        {errors.title && <span>This field is required</span>}
        <div>
        <div className="inputLabel">محتوي المقال:
          <textarea 
          style={{width:'600px', height:"600px"}}
            type="text" 
            name="body" 
           
            {...register("body", { required: true })}
          />
          </div>
          {errors.body && <span>This field is required</span>}
          </div>
        <div className="inputLabel">المؤلفون:</div>
          <Controller
                name="entryauthor"
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
            {errors.entryauthor && <span>This field is required</span>}
     
        <div className="inputLabel">الدولة:</div>
          <Controller
                  name="entryOrigin"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => 
                  <Select
                  
                      {...field}
                      options={countryOptions}
                      />
              }
              />
              {errors.entryOrigin && <span>This field is required</span>}
      

            <div className="inputLabel">التصنيف:</div>
        <Controller
                name="entryClassification"
                rules={{ required: true }}
                control={control}
                render={({ field }) => 
                <Select
                    isMulti
                    {...field}
                    options={classificationOptions}
                    />
            }
            />
            {errors.entryClassification && <span>This field is required</span>}
     

            <div className="inputLabel">الفئة:</div>
        <Controller
                name="entryCategory"
                rules={{ required: true }}
                control={control}
                render={({ field }) => 
                <Select
                    
                    {...field}
                    options={categoriesOptions}
                    />
            }
            />
            {errors.entryCategory && <span>This field is required</span>}
     
            <div >
            <label className="inputLabel">تاريخ النشر :
        <input 
          type="date" 
          name="entryPubDate" 
          {...register("entryPubDate", { required: true })}
        />
        </label>
        {errors.entryPubDate && <span>This field is required</span>}
     
        </div>
        <div>
        <label className="inputLabel">المرجع:
          <textarea 
            type="text" 
            name="bibiliography" 
            {...register("bibiliography", { required: true })}
          />
          </label>
          {errors.bibiliography && <span>This field is required</span>}
     
            </div>
           
           <div>
           <label className="inputLabel">غلاف الكتاب  :
          <input type="file" 
          name="entryCover"
          accept="image/jpeg,image/png,image/gif"
          {...register("entryCover", { required: true })} />
      </label>
      {errors.entryCover && <span>This field is required</span>}
     
           </div>
         
         
          <input type="submit" />
      </form>
      <div style={styles.submitted} >
                    <h1>تم إدخال المحتوي بنجاح</h1>
                </div>
      </div>
    )
}
