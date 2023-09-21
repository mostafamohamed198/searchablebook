
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "../../authentication/AuthContext";
import { useForm, Controller } from "react-hook-form";

export default function AuthorForm() {
    const navigate = useNavigate()
    let {authTokens, logoutUser} = useContext(AuthContext)
    const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
  
    const onSubmit = (data) => {

        let form_data = new FormData();
        form_data.append('picture', data.picture[0], data.picture[0].name);
        form_data.append('name', data.name);
        form_data.append('degree', data.degree);
        form_data.append('about', data.about);
            axios.post('/api/thesearchable/authorpostForm/', form_data, {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization':'Bearer ' + String(authTokens.access)
              }
          }).then(res => {
          
              alert('posted')
              navigate(`/authordetails/${res.data.id}`)
          }).catch(err => {
            alert('error')
          })
            
    }
    
    
  return (
    <div style={{margin: '20px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>إضافة كاتب :</h2>
            <div>
                <label className='inputLabel'>
                    اسم الكاتب:
                    
                    <input className="inputForm" type="text" {...register("name", { required: true })}/>  

                </label>
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <label className='inputLabel'> صوره الكاتب  :
                <input type="file" 
                name="picture"
                accept="image/jpeg,image/png,image/gif"
                {...register("picture", { required: true })} />
            
                    </label>
                {errors.picture && <span>This field is required</span>}
            </div>
            <div>
                <label className='inputLabel'>
                    الدرجة العلمية
                    
                    <input className="inputForm" type="text" {...register("degree", { required: true })}/>   
                
                </label>
                {errors.degree && <span>This field is required</span>}
            </div>
            <div>
            <label className='inputLabel'>
                <div>معلومات عن الكاتب:</div>
                <textarea 
                    type="text" 
                    name="about"
                    className='form-texarea' 
                    // value={inputs.about || ""} 
                    {...register("about", { required: true })}
                />
            </label>
            {errors.about && <span>This field is required</span>}
            </div>
            <input type="submit" />
        </form>
    </div>

  );
}
