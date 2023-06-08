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
  const setToken = (token, maxAge) => {
    setCookie('token', token, { maxAge: maxAge / 1000, sameSite: 'lax' })
    setTimeout(() => {
      logout()
    }, maxAge) // po uplynieciu czasu cookie sie usunie, potem przesylac maxage z serwera?
  }
  return (
    <>
      {cookies.token ? <MainPage logout={logout} /> : <UserValidation setToken={setToken} />}
    </>
  )
}

export default App
