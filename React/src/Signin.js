
import React, {useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "./Navbar";

function Form() {
  const [formData, setFormData] = useState({
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
    // console.log(formData);
  };
 const handleSingup=()=>{
  navigate('/signup')
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    // console.log(formData);
    setDataList(formData)
    // console.log(dataList);
            
    axios.post("http://localhost:5000/signin",formData)
    .then(response=>{
      let token=response.data.token;
      let user_id=response.data.user._id;
      localStorage.setItem("id", user_id);
      console.log(user_id);
      console.log(response.data.message)
      if(response.data.message==="successful"){
        localStorage.setItem("token", token);
      
        navigate('/welcome')
      }
     
     
    })
    .catch(error=>{
      console.log(error.message)
      if(error.message==="Request failed with status code 401"){
        alert('Invalid Plz sign up');
      }
      
      
    })

   setreload(load+1)
   console.log(load);
  };
 
  return (
    <>
      <div>
        <div className="signup">
          <h1>Sign In</h1>
           
            <label>
            Email:
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
           <br />
           <label>
          
              Password:
              <br />
              <input
               placeholder="Enter password"
                type="password"
                name="password"
                value={formData.age}
                onChange={handleChange}
              />
            </label>
            <br />
        
           <br />
            <button type="submit" onClick={handleSubmit}>Sign in</button>
            <h5>If ypu are not sign up plz sign up </h5><a ><Link to="/">Sign UP</Link></a>
            <button type="submit" onClick={handleSingup}>Sign Up</button>
    
        </div>
      </div>
    </>
  );
}

export default Form;
