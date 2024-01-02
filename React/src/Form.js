import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Form(props) {
  
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email:"",
    image:""
    
  });


  const [dataList, setDataList] = useState([]);
  const [load, setreload] = useState(1);

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
    // console.log(token);
    if (!token) {
      alert('You are not login plz log in ');
    
    }
    let user_id = localStorage.getItem('id');
    // console.log("kk");
                      // method to handle the file data 
    const data = new FormData();
    data.append("name",formData.name);
    data.append("age",formData.age);
    data.append("email",formData.email);
    data.append("upload",formData.image);
    data.append("user_id","zee");
    setDataList(dataList, formData);
  
    // console.log(token);
    console.log("y",data);

      axios.post("http://localhost:5000/create",data,{ headers: {"Authorization" : token} }  )
    .then(response=>{
      console.log(response.data)
    })

   setreload(load+1)
   console.log(load);
   navigate('/showdata')
   
  };
  return (
    <>
    <Navbar/>
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
              required
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

export default Form;
