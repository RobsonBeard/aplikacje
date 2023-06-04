import './App01.css'
import Home from './Home'
import About from './About'
import Products from './Products'

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App1 = () => {
  return (
    <div>
      <h1>01: REACT ROUTER - SIMPLE</h1>

      <Router>
        <div className='body-center'>
          <div className='header'>My Application</div>
          <div className='link-container'>
            <Link to='/'>HOME</Link>
            <Link to='/about'>ABOUT</Link>
            <Link to='/products'>PRODUCTS</Link>
          </div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/products' element={<Products />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
// element <Routes> działa jak switch w js - szuka pierwszego elementu który pasuje do url-a, resztę pomija
// dlatego ważna jest kolejność Route

export default App1
