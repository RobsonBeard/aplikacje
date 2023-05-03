import './App05.css'
import Divs from './Divs'

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


const App = () => {

  let linkData = [7, 3, 5, 6, 10, 20, 2, 1, 11]

  const stworzLinki = () => {
    let tablicaLinkow = []
    for (let i = 0; i < linkData.length; i++) {
      let linkPath = `/${linkData[i]}`
      tablicaLinkow.push(<Link to={linkPath} key={i}>PARAM = {linkData[i]}</Link>)
      tablicaLinkow.push(" ")
    }
    return tablicaLinkow
  }

  return (
    <div>
      <h1>05: REACT ROUTER - PARAMS IN URL - STATE - DIVS  </h1>

      <Router>
        <div className='body-center'>
          <div className='header'>
            My Application&nbsp;<Link to="/">MAIN</Link>
          </div>
          <div className='link-container'>
            {stworzLinki()}
          </div>
          <Routes>
            <Route path="/:id" element={<Divs />} />
            <Route path="*" element={<h2>Path not found</h2>} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
