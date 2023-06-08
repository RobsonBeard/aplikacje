import './App03.css'
import Child from './Child'
// import Details from './Details';
// import Home from './Home';

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const stworzLinki = () => {
    const tablicaLinkow = []
    for (let i = 0; i < 50; i++) {
      const linkPath = `/${i}`
      tablicaLinkow.push(<Link to={linkPath} key={i}>PARAM = {i}</Link>)
      tablicaLinkow.push(' ')
    }
    return tablicaLinkow
  }

  return (
    <div>
      <h1>03: REACT ROUTER - PARAMS IN URL - DYNAMIC LINKS  </h1>

      <Router>
        <div className='body-center'>
          <div className='header'>
            My Application&nbsp;<Link to='/'>MAIN</Link>
          </div>
          <div className='link-container'>
            {stworzLinki()}
          </div>
          <Routes>
            <Route path='/:id' element={<Child />} />
            <Route path='*' element={<h2>Path not found</h2>} />
          </Routes>
        </div>
      </Router>

      {/* <Router>

        <Link to="/">Home</Link>
        <Link to="/details">Details</Link>
        <Link to="/details/1">Details/1</Link>
        <Link to="/details/2">Details/2</Link>

        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/details" element={<Details />} />
          <Route path="/" element={<Home />} />
        </Routes>

      </Router> test - nic sie chyba nie stalo, dziwne */}

    </div>
  )
}
// element <Routes> działa jak switch w js - szuka pierwszego elementu który pasuje do url-a, resztę pomija
// dlatego ważna jest kolejność Route

export default App
