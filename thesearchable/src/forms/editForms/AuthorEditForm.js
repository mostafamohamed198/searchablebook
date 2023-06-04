import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";
import {Route, Link, Routes, useParams} from 'react-router-dom';


export default function AuthorEditForm() {
    const params = useParams();
    const [values, setValues] = React.useState({})
    const [inputs, setInputs] = React.useState({});
    const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
   React.useEffect(function(){

    fetch('/auth_info/' + params.id)
        .then(res => res.json())
        .then(data => {
            setValues(data)
        })
   },[])
        const onSubmit = (data) => {
            console.log(data)
            let form_data = new FormData();
            if (data.picture[0] != null){
        form_data.append('picture', data.picture[0], data.picture[0].name);
    }

if( data.name != ''){
        form_data.append('name', data.name);
    }

    if( data.degree != ''){
        form_data.append('degree', data.degree);
    }

    if( data.about != ''){
        form_data.append('about', data.about);

    }
            axios.put(`/authorchange/${values.id}/`, form_data, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }).then(res => {
              console.log(res);
              alert('edited')
          }).catch(err => {
              console.log(err.response.data);
              alert('failed')
          })
            
          }
    
  return (
    <div style={{margin: '20px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>تعديل الكاتب :</h2>
            <div>
                <label className='inputLabel'>
                    اسم الكاتب:
                    
                    <input defaultValue={values.name} className="inputForm" type="text" {...register("name", { required: false })}/>  
                   
                </label>
                {/* {errors.name && <span>This field is required</span>} */}
            </div>
            <div>
                <label className='inputLabel'> صوره الكاتب  :
                <input type="file" 
                name="picture"
                accept="image/jpeg,image/png,image/gif"
                {...register("picture", { required: false })} />
            
                    </label>
                {/* {errors.picture && <span>This field is required</span>} */}
            </div>
            <div>
                <label className='inputLabel'>
                    الدرجة العلمية
                    
                    <input className="inputForm" type="text" defaultValue={values.degree} {...register("degree", { required: false })}/>   
                
                </label>
                {/* {errors.degree && <span>This field is required</span>} */}
            </div>
            <div>
            <label className='inputLabel'>
                <div>معلومات عن الكاتب:</div>
                <textarea 
                defaultValue={values.about}
                    type="text" 
                    name="about"
                    className='form-texarea' 
                    // value={inputs.about || ""} 
                    {...register("about", { required: false })}
                />
            </label>
            {/* {errors.about && <span>This field is required</span>} */}
            </div>
            <input type="submit" />
        </form>
    </div>

  );
}
