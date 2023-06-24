import { PropaneSharp } from "@mui/icons-material";
import React from "react";
import axios from "axios";
import Select from 'react-select';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { style } from "@mui/system";
import { useContext } from "react";
import AuthContext from "../../authentication/AuthContext";

export default function DoorForm (props){
  let {authTokens, logoutUser} = useContext(AuthContext)
    const [formValues, setFormValues] = React.useState([{ name: "" , relatedParts: []}])
    const [theParts , settheParts] = React.useState([])
    const [doorDisplay, setDoorDisplay] =React.useState(true)
    const [submittedDisplay, setSubmittedDisplay] = React.useState(false)
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }

        const handlePartChange =(index, choice) =>{  
            
         
            let choices = []
            choice.map(onechoice => {
                
            })
            let newFormValues = [...formValues];
            newFormValues[index]['relatedParts'] = choices;
            setFormValues(newFormValues)

        // let classArray = []
        // selectedOption.map(option => {
        //   classArray.push(option.value)
        // })
        // let newFormValues = [...formValues];
        // newFormValues[i]['relatedParts'] = classArray;
        // setFormValues(newFormValues);
        
        // setFormValues([...formValues, {relatedParts: classArray}])
      }

    //   const handlePartChange =(i, selectedOption) =>{    
    //     let classArray = []
    //     selectedOption.map(option => {
    //       classArray.push(option.value)
    //     })
        
    //     setFormValues([...formValues, {relatedParts: classArray}])
    //   }
    
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", relatedParts: []}])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    // let handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(JSON.stringify(formValues));
    // }
    let handleSubmit = (event) => {
        event.preventDefault();
        
    
    //     fetch(`/adddoor/${props.id}/`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //    content: formValues
    //  })})
    formValues.map(value => {
          
 
      let form_data = new FormData();
      form_data.append('name', value.name);
      form_data.append('relatedParts', value.relatedParts)
      axios.post(`/adddoor/${props.id}/`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':'Bearer ' + String(authTokens.access)
      }
      }).then(res => {
    
      }).catch(err => {
       
      })
            })
      
     setDoorDisplay(false)
     setSubmittedDisplay(true)

    
  
    }
   
 const styles= {
    door: {
        display: doorDisplay? 'block' : 'none'
    },
    submit: {
        display: submittedDisplay? 'block' : 'none'
    }
  }

  
    return(
        <div style={{margin:'20px'}}>
        <form style={styles.door}  onSubmit={handleSubmit}>
            <h2>أضف أبواب الكتاب</h2>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <label className="inputLabel">اسم الباب:</label>
              <input className="inputForm" type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
              <h3>الأجزاء الموجوده داخل الباب:</h3>
              <Select
                isMulti
                name="relatedParts"
                // onChange={(index, choice) => handlePartChange(index, choice)}
                onChange={(choice) => handlePartChange(index, choice)}
                options= {props.parts}
                />

              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}><FontAwesomeIcon icon={faCircleMinus} /></button> 
                : null
              }
            </div>
          ))}
          <div style={{marginTop:"50px"}} className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}><FontAwesomeIcon icon={faCirclePlus} /></button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
      <div style={styles.submit} >
      <h1>تم إدخال الكتاب بنجاح</h1>
  </div>
  </div>
    )
}