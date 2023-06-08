// * funkcje do pracy z aplikacją
// ---
//* użytkownicy

// const logger = require('tracer').colorConsole()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ms = require('ms')
require('dotenv').config()

const { usersArr, getUserID, setUserID, confirmUserAccount } = require('./model')
const utils = require('./utils')

// TODO: można wprowadzić statusy responsów ze speca z NODEJS9, dowiedzieć się, czy trzeba i czy są potrzebne

const register = (userData) => {
  return new Promise((resolve, reject) => { // TODO: można zrobić jakieś wymagania co do emaili, chyba ze to po prostu w inpucie po stronie klienta
    try {
      if (userData.name === undefined || userData.lastName === undefined || userData.email === undefined || userData.password === undefined) {
        resolve({ success: false, message: 'Required data not provided' })
      }
      if (usersArr.find(elem => elem.email === userData.email) !== undefined) {
        resolve({ success: false, message: 'This email is already occupied by another user' })
      }

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

      const expireTime = '10m' //! uwaga - po resecie serwera token nadal może być aktywny, zawierać ID i potwierdzić konto nieprawidłowego użytkownika, więc uważać na expire time
      const token = jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn: expireTime })

      // TODO: chciałbym, żeby po wygaśnięciu tokena można było podjąć próbę rejestracji jeszcze raz, może przerobić to tak, żeby od razu nie dodawać do usersArr, tylko dopiero po potwierdzeniu, przemyśleć

      resolve({ success: true, message: `Successfully registered! Copy the link below to confirm your account. Beware: The link is active for ${expireTime}.`, link: `http://localhost:${process.env.APP_PORT}/api/user/confirm/${token}`, result: userObj })
    } catch (error) {
      reject(error)
    }
  })
}

const confirmUser = async (token) => {
  const decoded = await utils.verifyToken(token)
  return new Promise((resolve, reject) => {
    try {
      if (!decoded.success) {
        resolve(decoded) // wtedy jest coś nie tak z tokenem
      }
      const userAccount = confirmUserAccount(decoded.result.id) // TODO: można potwierdzić to samo konto więcej niż 1 raz, można to poprawić
      resolve({ success: true, message: 'Your account has been confirmed', result: userAccount })
    } catch (error) {
      reject(error)
    }
  })
}

const login = (loginData) => {
  return new Promise((resolve, reject) => { // TODO: można zrobić jakieś wymagania co do emaili, chyba ze to po prostu w inpucie po stronie klienta
    try {
      if (loginData.email === undefined || loginData.password === undefined) {
        resolve({ success: false, message: 'Required data not provided' })
      }
      const user = usersArr.find(elem => elem.email === loginData.email)

      if (user === undefined) {
        resolve({ success: false, message: 'There is no user with provided email' })
      }

      if (!user.confirmed) {
        resolve({ success: false, message: 'Your account has not been confirmed yet' })
      }
      const decryptedPassword = bcrypt.compareSync(loginData.password, user.password)

      if (!decryptedPassword) {
        resolve({ success: false, message: 'Invalid password' })
      }
      const expireTime = '10m'
      // logger.log(typeof ms(expireTime)) // number

      const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: expireTime }) // ? tutaj logindata w tokenie?
      resolve({ success: true, message: 'User logged in', result: token, expireTimeInMiliseconds: ms(expireTime) })
    } catch (error) {
      reject(error)
    }
  })
}

// const getUsers = () => { // to była tylko testowa funkcja, powinna byc w miejscu, gdzie wymagany jest token - tutaj nie jest
//   return new Promise((resolve, reject) => {
//     try {
//       if (usersArr.length !== 0) {
//         resolve({ success: true, message: 'operacja powiodła się', result: usersArr })
//       } else {
//         resolve({ success: false, message: 'tablica userów jest pusta' })
//       }
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

module.exports = { register, confirmUser, login }
