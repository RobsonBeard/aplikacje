import './App02.css'
import Child from './Child'

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App2 = () => {
  return (
    <div>
      <h1>02: REACT ROUTER - PARAMS IN URL</h1>

      <Router>
        <div className='body-center'>
          <div className='header'>My Application</div>
          <div className='link-container'>
            <Link to='/1'>PARAM = 1</Link>
            <Link to='/2'>PARAM = 2</Link>
            <Link to='/3'>PARAM = 3</Link>
          </div>
          <Routes>
            <Route path='/:id' element={<Child />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
// element <Routes> działa jak switch w js - szuka pierwszego elementu który pasuje do url-a, resztę pomija
// dlatego ważna jest kolejność Route

export default App2
