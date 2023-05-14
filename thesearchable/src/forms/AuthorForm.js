// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import axios from 'axios';
// import React from 'react';
// import { useForm, Controller } from "react-hook-form";
// import { TextField, Checkbox } from "@material-ui/core";

// export default function AuthorForm() {
//     const [inputs, setInputs] = React.useState({});
//     const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
//     const handleImageChange = (e) => {
//         let image = e.target.files[0]
//         setInputs(values => ({...values,'picture' : image}))
    
//     };
        
    
//     const handleChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({...values, [name]: value}))
        
//         }

//         const onSubmit = (event) => {

//             event.preventDefault()
//             let form_data = new FormData();
//         form_data.append('picture', inputs.picture, inputs.picture.name);
//         form_data.append('name', inputs.name);
//         form_data.append('degree', inputs.degree);
//         form_data.append('about', inputs.about);
//             axios.post('/authorpostForm/', form_data, {
//               headers: {
//                   'Content-Type': 'multipart/form-data'
//               }
//           }).then(res => {
//               console.log(res);
//           }).catch(err => {
//               console.log(err.response.data);
//           })
            
//           }
    
    
//   return (
//     <div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <label>
//                     اسم الكاتب:
//                     <input 
//                     name='name' 
//                     type='text'
//                     onChange={handleChange}
//                     value={inputs.name || ""} />    
//                 </label>
//             </div>
//             <div>
//                 <label> صوره الكاتب  :
//                     <input type="file" 
//                     name="picture"
//                     accept="image/jpeg,image/png,image/gif"
//                     onChange={(e) => {handleImageChange(e)}} />
//                 </label>
//             </div>
//             <div>
//                 <label>
//                     الدرجة العلمية
//                     <input 
//                     type="text" 
//                     name="degree" 
//                     onChange={handleChange}
//                     value={inputs.degree || ""} 
//                     />
//                 </label>
//             </div>
//             <div>
//             <label>
//                 معلومات عن الكاتب:
//                 <textarea 
//                     type="text" 
//                     name="about" 
//                     value={inputs.about || ""} 
//                     onChange={handleChange}
//                 />
//             </label>
//             </div>
//             <input type="submit" />
//         </form>
//     </div>

//   );
// }

// // name = models.CharField(max_length=200)
// //     picture = models.ImageField(upload_to='authorimage/')
// //     degree = models.CharField(max_length=300)
// //     about = models.TextField()

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";

export default function AuthorForm() {
    const [inputs, setInputs] = React.useState({});
    const { register, handleSubmit,control, watch, formState: { errors } } = useForm({});
    const handleImageChange = (e) => {
        let image = e.target.files[0]
        setInputs(values => ({...values,'picture' : image}))
    
    };
        
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        
        }

        const onSubmit = (data) => {

         
            let form_data = new FormData();
        form_data.append('picture', data.picture[0], data.picture[0].name);
        form_data.append('name', data.name);
        form_data.append('degree', data.degree);
        form_data.append('about', data.about);
            axios.post('/authorpostForm/', form_data, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }).then(res => {
              console.log(res);
          }).catch(err => {
              console.log(err.response.data);
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
