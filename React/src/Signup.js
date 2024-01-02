
import React, {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    password: ""
  });

  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [load, setreload] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    setDataList(...dataList,formData)
    console.log(dataList);
            
    axios.post("http://localhost:5000/signup", formData)
    .then(response => {
      console.log(response.data);
      if (response.data) {
        navigate('/');
      }
    })
    .catch(error => {
      console.error("Error during signup:", error);
      
      // Check if it's a validation error (for example, incorrect input fields)
      if (error.response && error.response.status === 400) {
        // Handle validation error, e.g., show an error message to the user
        alert("Validation error: Please check your input fields.");
      } else {
        // Handle other types of errors, e.g., server errors
        navigate('/signup'); // Redirect to signup page in case of other errors
      }
    });
  
   

   setreload(load+1)
   console.log(load);
  };
  
  return (
    <>
 
      <div className="signup">
          <h1>Sign UP</h1>
            <label>
              Name:
              <br />
              <input
               placeholder="Enter your name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <br />
            <br />
            <label>
            Email:
             <input
             placeholder="Enter your emil"
               type="text"
               name="email"
               value={formData.email}
               onChange={handleChange}
             />
           </label>
           <br />
           <br />
           <label>
          
              Password:
              <br />
              <input
               placeholder="Enter password"
                type="text"
                name="password"
                value={formData.age}
                onChange={handleChange}
              />
            </label>
            <br />
        
           <br />
            <button type="submit" onClick={handleSubmit}>Submit</button>
    
        </div>
    
    
    </>
  );
}

export default Form;
