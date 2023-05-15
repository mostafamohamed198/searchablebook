import { PropaneSharp } from "@mui/icons-material";
import React from "react";
import axios from "axios";
import DoorForm from "./DoorForm";
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function PartForm (props){
    const [formValues, setFormValues] = React.useState([{ name: ""}])
    const [newParts, setNewParts] = React.useState([])
    const [doorDisplay, setDoorDisplay] = React.useState(false)
    const [submittedDisplay,setSubmittedDisplay] = React.useState(false)
    const [partDisplay, setPartDisplay] = React.useState(true)
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { name: ""}])
      }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    const styles={
      door: {
        display: doorDisplay? 'block' : 'none'
      }, 
      submitted:{
        display: submittedDisplay? 'block': 'none'
    },
    part:{
      display: partDisplay? 'block': 'none'
    }
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        
        formValues.map(value => {
          
 
    let form_data = new FormData();
    form_data.append('name', value.name);
    axios.post(`/addpart/${props.id}/`, form_data, {
    }).then(res => {
      
        const thePart = {value: res.data.id, label: res.data.name, selected: false}
        setNewParts(oldArray => [...oldArray, thePart])
    }).catch(err => {
        console.log(err.response.data);
    })
          })
          alert('posted');
          setPartDisplay(false)
          props.containsDoors ? setDoorDisplay(true) : setSubmittedDisplay(true)
    }
    

    return(
    <div>
          <form style={styles.part} className="part--form"  onSubmit={handleSubmit}>
            <h2>أضف أجزاء الكتاب</h2>
            {formValues.map((element, index) => (
              <div className="form-inline" key={index}>
                <label className="inputLabel">اسم الجزء:</label>
                <input className="inputForm" type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                {
                  index ? 
                    <button type="button"  className="button remove" onClick={() => removeFormFields(index)}><FontAwesomeIcon icon={faCircleMinus} /></button> 
                  : null
                }
              </div>
            ))}
            <div  className="button-section">
                <button className="button add" type="button" onClick={() => addFormFields()}><FontAwesomeIcon icon={faCirclePlus} /></button>
                <button className="button submit" type="submit">Submit</button>
            </div>
        </form>
        <div style={styles.submitted} >
                    <h1>تم إدخال الكتاب بنجاح</h1>
                </div>
        <div style={styles.door}> 
          <DoorForm parts={newParts} id={props.id}/>
        </div>
    </div>
    )
}