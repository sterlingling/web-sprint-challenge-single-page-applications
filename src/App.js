import React, { useState } from "react";
import Form from './Form'
import Home from "./Home";
import schema from './formSchema';
import * as yup from 'yup';
import { Routes, Route, Link } from 'react-router-dom';
import axios from "axios";



const App = () => {

  

 

  

  return (
    <div className="App">
      <h1>Sterling's Pizzaria</h1>

      <div className="nav-links">
        <nav>

          <Link to="/">Home</Link>
          <Link to='form'>Order Now</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pizza" element={<Form />} />
      </Routes>
    </div>

  );
};
export default App;
