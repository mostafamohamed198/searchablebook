
import axios from 'axios';
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {useParams} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../authentication/AuthContext';

export default function AuthorEditForm() {
    let {authTokens} = useContext(AuthContext)
  
    const params = useParams();
    const [values, setValues] = React.useState({})
    const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
    React.useEffect(function(){

        fetch('/api/thesearchable/auth_info/' + params.id)
            .then(res => res.json())
            .then(data => {
                setValues(data)
            })
    },[])
        const onSubmit = (data) => {
      
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
            axios.put(`/api/thesearchable/authorchange/${values.id}/`, form_data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':'Bearer ' + String(authTokens.access)
                }
            }).then(res => {
            
                alert('edited')
            }).catch(err => {
                
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
