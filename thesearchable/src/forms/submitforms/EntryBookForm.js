

        
import React from "react";
import Select from 'react-select'
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";
import { useContext } from "react";
import AuthContext from "../../authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
export default function EntryBookForm(){
  const navigate = useNavigate()
  let {authTokens, logoutUser} = useContext(AuthContext)
  const [bodyInput , setBodyInput] = React.useState({})
    const [inputs, setInputs] = React.useState({part: 0});
    const [bookId, setBookId] = React.useState(0)
    const [bookOptions, setBookOptions] =React.useState([])
    const [bookName, setBookName] = React.useState('')
    const [book, setBook] = React.useState()
    const [partsOptions, setPartsOptions] = React.useState([])
    const [partId, setPartId] = React.useState(0)
    const [partName, setPartName] = React.useState('')
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
       if (bookId != 0){
        fetch(`/bookdetail/${bookId}`)
        .then(res => res.json())
        .then(data => {
           setBook(data)
           data.relatedParts.map(part => {
            let newPart = {value: `${part.id}`, label: `${part.name}`}
            setPartsOptions(oldArray => [...oldArray, newPart])
           })
        })
      }
    },[bookId])
    
  const handleBookChange =(selectedOption) =>{

    setBookId(selectedOption.value)
    setBookName(selectedOption.label)
    
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
    setPartName(selectedOption.label)
  }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setBodyInput(values => ({...values, [name]: value}))
     
      }

    
      const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});

      const onSubmit = (data) => {
function entrySource(){
  if (partId != 0){
    return(
      `${bookName} ، ${partName}`
    )

  }
  else{
    return(
      `${bookName}`
    )
  }
}


  axios.post('/entrybookformpost/',
    JSON.stringify ({
        title: data.title,
        body: data.body,
        bibiliography: data.bibiliography,
        book: bookId,
        part: partId,
        source: entrySource()

    })
, {
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer ' + String(authTokens.access)
},
})
    .then(res => {
       alert('posted')
       navigate(`/entry/${res.data.id}/`);
  
          }).catch(err => {
          alert('error')

          })
          // setFormDisplay(false)
          // setSubmittedDisplay(true)
      }


    return(
        <div style={{margin: '20px'}}>
        <form style={styles.entry} onSubmit={handleSubmit(onSubmit)}>
           
           <label className="inputLabel">عنوان المقال :
        <input className="inputForm" type="text" {...register("title", { required: true })}/>
        </label>
        {errors.title && <span>This field is required</span>}
        <div  className="content--input--div">
        <div className="inputLabel content--textarea">محتوي المقال:
          <textarea 
          style={{width:'100%', height:"600px"}}
            type="text" 
            name="body" 
           
            {...register("body", { required: true })}
            onChange={(e) => {handleChange(e)}}
          />

          </div>

          <ReactMarkdown className="SE--markdown--content" rehypePlugins={[rehypeRaw, remarkGfm]} children={bodyInput.body} remarkPlugins={[remarkGfm]} />
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

        
