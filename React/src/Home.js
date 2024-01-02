
import React, {useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    password: ""
  });


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
  };
  
  return (
    <>
    <Navbar/>
      <div>
        <div className="form">
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
      </div>
    </>
  );
}

export default Home;
