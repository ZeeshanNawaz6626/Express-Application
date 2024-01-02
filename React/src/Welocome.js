import { click } from '@testing-library/user-event/dist/click'
import React from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';


export default function Welocome() {
    const navigate = useNavigate();
   
    const handleShow =()=>{
      navigate("/showdata")
   }
  return (
    
    <>
     <Navbar/>
    <div className="welcome">
    <h1>Welocome to my website</h1>
    <button className = "btn" onClick={handleShow}>Show Students</button>
    </div>
    
    </>
   
  )
}
