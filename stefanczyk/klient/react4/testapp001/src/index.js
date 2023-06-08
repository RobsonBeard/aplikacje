import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App/App';
// import App1 from './App01/App01';
// import App2 from './App02/App02';
import App3 from './App03/App03'
// import App4 from './App04/App04';
// import App5 from './App05/App05';
// import App6 from './App06/App06';
// import App7 from './App07/App07';
// import App8 from './App08/App08'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App3 />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
