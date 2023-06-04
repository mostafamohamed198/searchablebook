// import React from "react";
// import Select from 'react-select'
// import axios from 'axios';
// import { useForm, Controller } from "react-hook-form";
// import { TextField, Checkbox } from "@material-ui/core";


// export default function EntryBookForm(){
//     const [inputs, setInputs] = React.useState({part: 0});
//     const [bookId, setBookId] = React.useState(0)
//     const [bookOptions, setBookOptions] =React.useState([])
//     const [book, setBook] = React.useState()
//     const [partsOptions, setPartsOptions] = React.useState([])
//     const [partId, setPartId] = React.useState(0)
//     React.useEffect (function(){
//         fetch('/booklist')
//         .then(res => res.json())
//         .then(data => {
//             data.map(book => {
//            let newBook = {value: `${book.id}`, label: `${book.name}`}  
//            setBookOptions(oldArray => [...oldArray, newBook]) 
//         })
//         })

//     },[])

//     React.useEffect(function(){
//         fetch(`/bookdetail/${bookId}`)
//         .then(res => res.json())
//         .then(data => {
//            setBook(data)
//            data.relatedParts.map(part => {
//             let newPart = {value: `${part.id}`, label: `${part.name}`}
//             setPartsOptions(oldArray => [...oldArray, newPart])
//            })
//         })
//     },[bookId])
    
//   const handleBookChange =(selectedOption) =>{
//     setBookId(selectedOption.value)
    
//   }
//   const handlePartChange =(selectedOption) => {
//     setPartId(selectedOption.value)
//   }

//     const handleChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({...values, [name]: value}))
      
//       }

//     // console.log(book.bookClassification)
//     console.log(book)
//       const handleSubmit = (event) => {
//         event.preventDefault()
//         let form_data = new FormData();
//     // form_data.append('title', inputs.title);
//     // form_data.append('body', inputs.body);
//     // // form_data.append('entryCover', book.cover);
//     // form_data.append('entryOrigin', book.bookOrigin);
//     // form_data.append('entryCategory', book.bookCategory);
//     // form_data.append('entryPubDate', book.publicationDate);
//     // form_data.append('bibiliography', inputs.bibiliography);
//     // form_data.append('entryClassification', book.bookClassification),
//     // form_data.append('entryauthor', book.author),
//     // form_data.append('thePart', partId),
//     // form_data.append('theBook', bookId)
//     //     axios.post('/entryForm/', form_data, {
//     //   }).then(res => {
//     //       console.log(res);
//     //   }).catch(err => {
//     //       console.log(err.response.data);
//     //   })
//    fetch('/entrybookform/',{
//         method: 'POST',
       
//         body: JSON.stringify ({
//             title: inputs.title,
//             body: inputs.body,
//             bibiliography: inputs.bibiliography,
//             book: bookId,
//             part: partId

//         })
//     }).then(res => {
//               console.log(res);
//           }).catch(err => {
//               console.log(err.response.data);
//             // console.log('working')
//           })
        
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
//         onChange={handleBookChange}
//             options={bookOptions}
//         />

//         <Select
//         onChange={handlePartChange}
//             options={partsOptions}
//         />


//         <label>المرجع:
//           <textarea 
//             type="text" 
//             name="bibiliography" 
//             value={inputs.bibiliography || ""} 
//             onChange={handleChange}
//           />
//           </label>
          
//           <input type="submit" />
//       </form>
//     )
// }

        
import React from "react";
import Select from 'react-select'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";


export default function EntryBookForm(){
    const [inputs, setInputs] = React.useState({part: 0});
    const [bookId, setBookId] = React.useState(0)
    const [bookOptions, setBookOptions] =React.useState([])
    const [book, setBook] = React.useState()
    const [partsOptions, setPartsOptions] = React.useState([])
    const [partId, setPartId] = React.useState(0)
     const [formDisplay, setFormDisplay] = React.useState(true)
    const [submittedDisplay, setSubmittedDisplay] = React.useState(false)
    React.useEffect (function(){
        fetch('/booklist')
        .then(res => res.json())
        .then(data => {
            data.map(book => {
           let newBook = {value: `${book.id}`, label: `${book.name}`}  
           setBookOptions(oldArray => [...oldArray, newBook]) 
        })
        })

    },[])

    React.useEffect(function(){
       
        fetch(`/bookdetail/${bookId}`)
        .then(res => res.json())
        .then(data => {
           setBook(data)
           data.relatedParts.map(part => {
            let newPart = {value: `${part.id}`, label: `${part.name}`}
            setPartsOptions(oldArray => [...oldArray, newPart])
           })
        })
    },[bookId])
    
  const handleBookChange =(selectedOption) =>{
    console.log('changed')
    console.log(selectedOption.value)
    setBookId(selectedOption.value)
    
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
  const handlePartChange =(selectedOption) => {
    setPartId(selectedOption.value)
  }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      
      }

      console.log(bookId)
      const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});

      const onSubmit = (data) => {

   fetch('/entrybookform/',{
        method: 'POST',
       
        body: JSON.stringify ({
            title: data.title,
            body: data.body,
            bibiliography: data.bibiliography,
            book: bookId,
            part: partId

        })
    }).then(res => {
              console.log(res);
          }).catch(err => {
              console.log(err.response.data);
            // console.log('working')
          })
          setFormDisplay(false)
          setSubmittedDisplay(true)
      }


    return(
        <div style={{margin: '20px'}}>
        <form style={styles.entry} onSubmit={handleSubmit(onSubmit)}>
           
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


        {/* <Select
        onChange={handleBookChange}
            options={bookOptions}
        /> */}
             <div className="inputLabel">الكتاب:</div>
            {/* <Controller
                  name="book"
                  rules={{ required: true }}
                  control={control}
                 
                  render={({ field }) => 
                  <Select
                    onChange={handleBookChange}
                      {...field}
                      options={bookOptions}
                      />
              }
              /> */}
                      <Select
         onChange={handleBookChange}
             options={bookOptions}
         />
              
  
             <div className="inputLabel">الجزء:</div>
            {/* <Controller
                  name="part"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => 
                  <Select
                  
                      {...field}
                      options={partsOptions}
                      />
              }
              />
              {errors.part && <span>This field is required</span>}
      */}
       <Select
        onChange={handlePartChange}
            options={partsOptions}
        />

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
          <input type="submit" />
      </form>
      <div style={styles.submitted} >
                    <h1>تم إدخال المحتوي بنجاح</h1>
                </div>
      </div>
    )
}

        
