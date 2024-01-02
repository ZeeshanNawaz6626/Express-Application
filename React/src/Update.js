import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

export default function Update() {
    const{id}=useParams();
    console.log(id);
  
    const [formData, setFormData] = useState({
      name: "",
      age: "",
      email:"",
      image: "",
      
    });
    useEffect(()=>{
        let token = localStorage.getItem('token');
        console.log('useeffect');
        axios.get(`http://localhost:5000/product/${id}`,{ headers: {"Authorization" : token}}).then((response) => {
            console.log(response.data.image);
        setFormData({...formData,
                 name:response.data.name,
                 age:response.data.age,
                 email:response.data.email,
                 image:response.data.image})
        });
      },[])

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value)
        setFormData({ ...formData, [name]: value });
        console.log(formData);
      };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('submit');
  
      
      var token = localStorage.getItem('token');
      const data = new FormData();
    data.append("name",formData.name);
    data.append("age",formData.age);
    data.append("email",formData.email);
    data.append("upload",formData.image);
    // console.log(FormData);
    console.log("sub",formData);
     
  //  console.log("up",id);
        axios.put(`http://localhost:5000/update/${id}`,formData,
        { headers: {"Authorization" : token} }  )
      .then(response=>{
        console.log(response.data)
      })
  
     navigate('/showdata')
     
    };
    return (
      <>
      
      <div>
        <div className="form">
        
          <form onSubmit={handleSubmit}>
          <h1>Enter Your  Data</h1>
            <label>
              Name:
              <br />
              <input
               placeholder="Enter your name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
             
              Age:
              <br />
              <input
               placeholder="Enter your age"
                type="text"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
            <br />
             email:
             <input
             placeholder="Enter your emil"
               type="text"
               name="email"
               required
               value={formData.email}
               onChange={handleChange}
             />
           </label>
           <br />
           <label>
           <br />
             Image:
             <input
             id="img"
               type="file"
               name="image"
              
               onChange={(e)=>setFormData({...formData,image:e.target.files[0]
                
               })}
             />
           </label>
           <br />
            <button type="submit">Submit</button>
            
          </form>
         </div>
      </div>
      </>
    );
  }
