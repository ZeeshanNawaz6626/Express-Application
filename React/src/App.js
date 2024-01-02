import './App.css';
import Form from './Form';
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';
import Welcome from './Welocome';
import Showdata from './Showdata';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Welocome from './Welocome';
import Protect from './Protect';
import { useState } from 'react';
import Update from './Update';
function App() {
  const[load,setLoad] = useState(1);
  
  const Updateload =(load)=>{
  
    setLoad(load)
    console.log("ok");
  }

  return (
    <>
 
<BrowserRouter>
    <Routes>
    <Route element={<Protect/>}>
    <Route path="/welcome" element={<Welocome/>}>
      </Route>
     
      <Route path="/form" element={<Form/>}>
      </Route>
      <Route path="/showdata" element={<Showdata/>} Updateload={Updateload}>
      </Route>
      <Route path="/update/:id" element={<Update/>}>
      </Route>
      </Route>
      <Route path="/" element={<Signin/>}>
      </Route>
      <Route path="/signup" element={<Signup/>}>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
