import './App04.css'
import Child from './Child'

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const App = () => {


  return (
    <div>
      <h1>04: REACT ROUTER - PARAMS IN URL - BUTTONS  </h1>

      <Router>
        <div className='body-center'>
          <div className='header'>
            My Application&nbsp;<Link to="/">MAIN</Link>
          </div>

          <Routes>
            <Route path="/:id" element={<Child />} />
            <Route path="*" element={<h2>Path not found</h2>} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
