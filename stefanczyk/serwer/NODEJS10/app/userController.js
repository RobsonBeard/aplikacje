// * funkcje do pracy z aplikacją
// ---
//* użytkownicy

// const logger = require('tracer').colorConsole()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { usersArr, getUserID, setUserID, confirmUserAccount } = require('./model')
const utils = require('./utils')

// TODO: można wprowadzić statusy responsów ze speca z NODEJS9, dowiedzieć się, czy trzeba i czy są potrzebne

const register = (userData) => {
  return new Promise((resolve, reject) => { // TODO: można zrobić jakieś wymagania co do emaili, chyba ze to po prostu w inpucie po stronie klienta
    try {
      if (userData.name !== undefined && userData.lastName !== undefined && userData.email !== undefined && userData.password !== undefined) {
        if (usersArr.find(elem => elem.email === userData.email) === undefined) {
          const encryptedPassword = bcrypt.hashSync(userData.password, 10)

          const userObj = {
            id: getUserID(),
            name: userData.name,
            lastName: userData.lastName,
            email: userData.email,
            password: encryptedPassword,
            confirmed: false
          }

          usersArr.push(userObj)
          setUserID(getUserID() + 1)

          const expireTime = '1m' //! uwaga - po resecie serwera token nadal może być aktywny, zawierać ID i potwierdzić konto nieprawidłowego użytkownika, więc uważać na expire time
          const token = jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn: expireTime })

          // TODO: chciałbym, żeby po wygaśnięciu tokena można było podjąć próbę rejestracji jeszcze raz, może przerobić to tak, żeby od razu nie dodawać do usersArr, tylko dopiero po potwierdzeniu, przemyśleć

          resolve({ success: true, message: `Pomyślnie zarejestrowano się! Skopiuj poniższy link do przeglądarki w celu potwierdzenia konta: http://localhost:${process.env.APP_PORT}/api/user/confirm/${token} Uwaga: link jest ważny przez ${expireTime}`, result: userObj })
        } else {
          resolve({ success: false, message: 'podano powtarzający się mail' })
        }
      } else {
        resolve({ success: false, message: 'nie podano wymaganych danych' })
      }
    } catch (error) {
      reject(error)
    }
  })
}

const confirmUser = async (token) => {
  const decoded = await utils.verifyToken(token)
  return new Promise((resolve, reject) => {
    try {
      if (decoded.success) {
        const userAccount = confirmUserAccount(decoded.result.id) // TODO: można potwierdzić to samo konto więcej niż 1 raz, można to poprawić

        resolve({ success: true, message: 'Konto zostało potwierdzone', result: userAccount })
      } else {
        resolve(decoded) // wtedy jest coś nie tak z tokenem
      }
    } catch (error) {
      reject(error)
    }
  })
}

const login = (loginData) => {
  return new Promise((resolve, reject) => { // TODO: można zrobić jakieś wymagania co do emaili, chyba ze to po prostu w inpucie po stronie klienta
    try {
      if (loginData.email !== undefined && loginData.password !== undefined) {
        const user = usersArr.find(elem => elem.email === loginData.email)
        if (user !== undefined) {
          if (user.confirmed) {
            const decryptedPassword = bcrypt.compareSync(loginData.password, user.password)
            if (decryptedPassword) {
              // TODO: o co chodzi z tym tworzeniem tokena w tym miejscu? czekam na odpowiedz antka
              // chyba ze w profilach juz cały czas korzystac z tokena
              const expireTime = '5m'
              const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: expireTime }) // ? tutaj logindata w tokenie?
              resolve({ success: true, message: 'zalogwano się', result: token })
            } else {
              resolve({ success: false, message: 'podano złe hasło' })
            }
          } else {
            resolve({ success: false, message: 'konto uzytkownika nie zostalo potwierdzone' })
          }
        } else {
          resolve({ success: false, message: 'nie znaleziono uzytkownika o podanym mailu' })
        }
      } else {
        resolve({ success: false, message: 'nie podano wymaganych danych' })
      }
    } catch (error) {
      reject(error)
    }
  })
}

const getUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      if (usersArr.length !== 0) {
        resolve({ success: true, message: 'operacja powiodła się', result: usersArr })
      } else {
        resolve({ success: false, message: 'tablica userów jest pusta' })
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { register, confirmUser, login, getUsers }
