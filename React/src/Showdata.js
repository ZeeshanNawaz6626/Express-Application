
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Form() {
 
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email:"",
    image:""
    
  });
 

  const [dataList, setDataList] = useState([]);
  const [load, setreload] = useState(1);

  const navigate = useNavigate();
  useEffect(()=>{
    let token = localStorage.getItem('token');
    console.log('ok');
    axios.get("http://localhost:5000/list",{ headers: {"Authorization" : token}}).then((response) => {
console.log('useeffect');
setDataList(response.data);
    });
  },[load])
  


  const handleDelete = (id) => {
    console.log('deleted');
    
    var token = localStorage.getItem('token');
    axios.delete(`http://localhost:5000/delete/${id}`,{ headers: {"Authorization" : token}}).then(() => {
        
    })
    .catch(error => {
        console.log('Error of deleting:', error.message);
    });

    console.log('delete');
    setreload(load-1)
    console.log(load);
}

const handleUpdate = (_id) => {

navigate(`/update/${_id}`)
  // axios.put(`http://localhost:5000/update/${_id}`, formData)
  //   .then(response => {
  //     console.log(response.data);
  //     setreload(load-1); // Trigger a reload after successful update
  //   })
  //   .catch(error => {
  //     console.error('Error updating data:', error.message);
  //   });
};



  return (
    <>
    <Navbar/>
      <div>
         <table>
          <thead>
            <tr>
            <td>Nmae</td>
            <td>Age</td>
            <td>eamil</td>
            <td>image link</td>
            {/* <td>Update</td> */}
            <td>Delete</td>
            </tr>
          </thead>
          <tbody>
           
             
            {dataList.map((data, e) => (
              
               <tr key={e}>
              
             <td> <h5>{data.name}</h5> </td>
           <td> <h5>{data.age}</h5></td>
           <td> <h5>{data.email}</h5></td>
           <td> <h5>{data.image}</h5></td>
            <td> <h5> <button  style={{color: "black",background:"yellow"}} onClick={() => handleUpdate(data._id)}>Update</button></h5></td>
           <td> <h5><button   style={{color: "black", background:"red"}}  onClick={() => handleDelete(data._id)}  >Delete</button></h5></td>
           </tr>
        ))}
  
      
          </tbody>
         </table>
      
       
      
        </div>
     
    </>
  );
}

export default Form;
