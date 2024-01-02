import React from 'react'
import { Link,useNavigate  } from 'react-router-dom'


export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout=()=>{
    navigate('/')
    localStorage.clear();
    }
  return (
 <>
    <div className='nav' >
      <ul >
        <li >   
            <a > <Link to="/welcome">Home</Link></a>
        </li>
        <li >
            <a > <Link to="/form">Add Student</Link></a> 
        </li>
        <li >
            <a > <Link to="/"  onClick={handleLogout} id='logout'>Logout</Link></a> 
        </li>
        
        
      </ul>
  </div>

</>
  )
}
