// import { useState } from 'react'
import './App.css'
import MainPage from './MainPage'
import UserValidation from './user/UserValidation'
import { useCookies } from 'react-cookie'

function App () {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const logout = () => {
    removeCookie('token')
  }
  const setToken = (token, maxAge = 600) => {
    setCookie('token', token, { maxAge })
    setTimeout(() => {
      logout()
    }, maxAge * 1000) // po uplynieciu czasu cookie sie usunie, potem przesylac maxage z serwera?
  }
  return (
    <>
      {cookies.token ? <MainPage logout={logout} /> : <UserValidation setToken={setToken} />}
    </>
  )
}

export default App
