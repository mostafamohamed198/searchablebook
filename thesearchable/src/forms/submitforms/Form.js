


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../../authentication/AuthContext";
// import Select from 'react-select'
// import axios from 'axios';
// import { useForm, Controller } from "react-hook-form";
// import { TextField, Checkbox } from "@material-ui/core";
// import MDEditor from '@uiw/react-md-editor';
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

// export default function Form(){
//   const navigate = useNavigate()
//     const [value, setValue] = React.useState({}) 
//     const [inputs, setInputs] = React.useState({});
//     const [authorOptions, setAuthorOptions] = React.useState([]);
//     const [countryOptions, setCountryOptions] = React.useState([])
//     const [categoriesOptions, setCategoriesOptions] = React.useState([])
//     const [classificationOptions, setClassificationOptions] = React.useState([])
//     const [selected, setSelected] = React.useState(null);
//     const [selectedFile, setSelectedFile] = React.useState(null);
//     const [entryClass, setEntryClass] =React.useState([])
//     const [entryAuth , setEntryAuth] = React.useState([])
//     const [formDisplay, setFormDisplay] = React.useState(true)
//     const [submittedDisplay, setSubmittedDisplay] = React.useState(false)
//     let {authTokens, logoutUser} = useContext(AuthContext)
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
    
//     const styles ={
    
//     entry:{
//           display: formDisplay? 'block': 'none',
//           margin:'20px'
//       },
//       submitted:{
//           display: submittedDisplay? 'block': 'none'
//       }
  
//     }
    

  
//   const handleImageChange = (e) => {
   
//     let image = e.target.files[0]
//     setInputs(values => ({...values,'entryCover' : image}))

// };
    

//     const handleChange = (event) => {
//         const name = event.target.name;
//         const thevalue = event.target.value;
//         // setValue (`${value}`)
//         console.log(value)
//         setValue(values => ({...values, [name]: thevalue}))
//         // setValue(value)
//         // console.log(value)
      
//       }

//       const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
    
//       const onSubmit = (data) => {
//         let classArray = []
//         data.entryClassification.map(option => {
//           classArray.push(option.value)
//         })

//         let authArray = []
//         data.entryauthor.map(option => {
//           authArray.push(option.value)
//         })

        

//         let form_data = new FormData();
//     form_data.append('entryCover', data.entryCover[0], data.entryCover[0].name);
//     form_data.append('title', data.title);
//     form_data.append('body', data.body);
//     form_data.append('entryOrigin', data.entryOrigin.value);
//     form_data.append('entryCategory', data.entryCategory.value);
//     form_data.append('entryPubDate', data.entryPubDate);
//     form_data.append('bibiliography', data.bibiliography);
//     // form_data.append('entryClassification', classArray),
//     // form_data.append('entryauthor', authArray)
    
  
//         axios.post('/entryForm/', form_data, {
//           headers: {
//               'Content-Type': 'multipart/form-data',
//               'Authorization':'Bearer ' + String(authTokens.access)
//           }
//       }).then(res => {
          
//           axios.put(`/entrychange/${res.data.id}/`,{
//             entryauthor: authArray,
//             entryClassification: classArray
//         },{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization':'Bearer ' + String(authTokens.access)
//       }}
//         )
//         // Redirect(`/entry/${res.data.id}/`)
//         navigate(`/entry/${res.data.id}/`);
//       }).catch(err => {
//           alert('error ');
        
//       })
        

//       setFormDisplay(false)
//       setSubmittedDisplay(true)
//       }


//     return(
//       <div style={{margin: '20px'}}>
//         <form style={styles.entry} onSubmit={handleSubmit(onSubmit)}>
//           <h2>أضف محتوي جديد:</h2>
//         <label  className="inputLabel">عنوان المقال :
//         <input  className="inputForm" type="text" {...register("title", { required: true })}/>
//         </label>
//         {errors.title && <span>This field is required</span>}
//         <div>
//         <div className="inputLabel">محتوي المقال:
//           <textarea 
//           style={{width:'600px', height:"600px"}}
//             type="text" 
//             name="body"
//             value={value.body}
//             // onChange={() => setValue(e.target.value)}
//             onChange={() => handleChange} 
//             {...register("body", { required: true })}
//           />
//                {/* <Controller
//         control={control}
//         rules={{
//           required: true,
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <textarea
//             placeholder="First name"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//         name="firstName"
//       /> */}
//           ??
//           <ReactMarkdown className="SE--markdown--content" rehypePlugins={[rehypeRaw, remarkGfm]} children={value} remarkPlugins={[remarkGfm]} />
//           <div>{value}</div>
//           </div>
//           {errors.body && <span>This field is required</span>}
//           </div>
//         <div className="inputLabel">المؤلفون:</div>
//           <Controller
//                 name="entryauthor"
//                 rules={{ required: true }}
//                 control={control}
//                 render={({ field }) => 
//                 <Select
//                     isMulti
//                     {...field}
//                     options={authorOptions}
//                     />
//             }
//             />
//             {errors.entryauthor && <span>This field is required</span>}
     
//         <div className="inputLabel">الدولة:</div>
//           <Controller
//                   name="entryOrigin"
//                   rules={{ required: true }}
//                   control={control}
//                   render={({ field }) => 
//                   <Select
                  
//                       {...field}
//                       options={countryOptions}
//                       />
//               }
//               />
//               {errors.entryOrigin && <span>This field is required</span>}
      

//             <div className="inputLabel">التصنيف:</div>
//         <Controller
//                 name="entryClassification"
//                 rules={{ required: true }}
//                 control={control}
//                 render={({ field }) => 
//                 <Select
//                     isMulti
//                     {...field}
//                     options={classificationOptions}
//                     />
//             }
//             />
//             {errors.entryClassification && <span>This field is required</span>}
     

//             <div className="inputLabel">الفئة:</div>
//         <Controller
//                 name="entryCategory"
//                 rules={{ required: true }}
//                 control={control}
//                 render={({ field }) => 
//                 <Select
                    
//                     {...field}
//                     options={categoriesOptions}
//                     />
//             }
//             />
//             {errors.entryCategory && <span>This field is required</span>}
     
//             <div >
//             <label className="inputLabel">تاريخ النشر :
//         <input 
//           type="date" 
//           name="entryPubDate" 
//           {...register("entryPubDate", { required: true })}
//         />
//         </label>
//         {errors.entryPubDate && <span>This field is required</span>}
     
//         </div>
//         <div>
//         <label className="inputLabel">المرجع:
//           <textarea 
//             type="text" 
//             name="bibiliography" 
//             {...register("bibiliography", { required: true })}
//           />
//           </label>
//           {errors.bibiliography && <span>This field is required</span>}
     
//             </div>
           
//            <div>
//            <label className="inputLabel">غلاف الكتاب  :
//           <input type="file" 
//           name="entryCover"
//           accept="image/jpeg,image/png,image/gif"
//           {...register("entryCover", { required: true })} />
//       </label>
//       {errors.entryCover && <span>This field is required</span>}
     
//            </div>
         
         
//           <input type="submit" />
//       </form>
//       <div style={styles.submitted} >
//                     <h1>تم إدخال المحتوي بنجاح</h1>
//                 </div>

//                 <div className="container">
//       {/* <MDEditor
//         value={value}
//         onChange={setValue}
//       />
//       <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
//     </div>
//       </div>
//     )
// }



import React from "react";
import { useContext } from "react";
import AuthContext from "../../authentication/AuthContext";
import Select from 'react-select'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";
import rehypeRaw from "rehype-raw";

export default function Form(){
  const navigate = useNavigate()
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
    let {authTokens, logoutUser} = useContext(AuthContext)
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
   
    let image = e.target.files[0]
    setInputs(values => ({...values,'entryCover' : image}))

};
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
      

      const { register, setValue , handleSubmit,control, watch, formState: { errors } } = useForm({});
   
      const onSubmit = (data) => {
        let classArray = []
        data.entryClassification.map(option => {
          classArray.push(parseInt(option.value))
        })

        let authArray = []
        data.entryauthor.map(option => {
          authArray.push(parseInt(option.value))
        })

        

        let form_data = new FormData();
    form_data.append('entryCover', data.entryCover[0], data.entryCover[0].name);
    form_data.append('title', data.title);
    form_data.append('body', data.body);
    form_data.append('entryOrigin', data.entryOrigin.value);
    form_data.append('entryCategory', data.entryCategory.value);
    form_data.append('entryPubDate', data.entryPubDate);
    form_data.append('bibiliography', data.bibiliography);
   
  
        axios.post('/entryForm/', form_data, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization':'Bearer ' + String(authTokens.access)
          }
                }).then(res => {
          
            //       fetch(`/entrychange/${res.data.id}`,{
            //         method: 'PUT',
            //         headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization':'Bearer ' + String(authTokens.access)
            //         },
            //         body: JSON.stringify({
            // entryauthor: authArray,
            // entryClassification: classArray
            //     })
            //     })
          axios.put(`/entrychange/${res.data.id}/`,{
            entryauthor: authArray,
            entryClassification: classArray
        }
        ,{
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization':'Bearer ' + String(authTokens.access)
      }}
        )
        alert('posted')
        navigate(`/entry/${res.data.id}/`);
//       axios.put(`/entrychange/${res.data.id}/`,{
     
//         entryClassification: classArray
//     },{
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       'Authorization':'Bearer ' + String(authTokens.access)
//   }}
//     )
//     axios.put(`/entrychange/${res.data.id}/`,{
//       entryauthor: authArray
  
//   },{
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     'Authorization':'Bearer ' + String(authTokens.access)
// }}
//   )
     
        // Redirect(`/entry/${res.data.id}/`)
       
      // }).then(res => {
          
      //     axios.put(`/entrychange/${res.data.id}/`,{
      //       entryauthor: authArray,
      //       entryClassification: classArray
      //   }, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //       'Authorization':'Bearer ' + String(authTokens.access)
      //   }})
       
      }).catch(err => {
          alert('error ');
          console.log(err)
      })
        

      // setFormDisplay(false)
      // setSubmittedDisplay(true)
      }


    return(
      <div style={{margin: '20px'}}>
        <form style={styles.entry} onSubmit={handleSubmit(onSubmit)}>
          <h2>أضف محتوي جديد:</h2>
        <label className="inputLabel">عنوان المقال :
        <input className="inputForm" type="text" {...register("title", { required: true })}/>
        </label>
        {errors.title && <span>This field is required</span>}
        <div className="content--input--div">
        <div className="inputLabel content--textarea">محتوي المقال:
          <textarea 
          style={{width:'100%', height:"600px"}}
            type="text" 
            name="body" 
            // onChange={(e) => setValue("body", e.target.value)}
            {...register("body", { required: true})}
            onChange={(e) => {handleChange(e)}}
          />
          {errors.body && <span>This field is required</span>}
         
          </div>
          <ReactMarkdown className="SE--markdown--content" rehypePlugins={[rehypeRaw, remarkGfm]} children={inputs.body} remarkPlugins={[remarkGfm]} />
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