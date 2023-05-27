// * funkcje do pracy z aplikacją
// ---
//* użytkownicy

const logger = require('tracer').colorConsole()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { usersArr, getUserID, setUserID } = require('./model')

const register = (userData) => {
  return new Promise((resolve, reject) => { // TODO: zrobic tak, zeby nie bylo dwoch powtarzajacych sie emaili (i moze nazw)
    try {
      if (userData.name !== undefined && userData.lastName !== undefined && userData.email !== undefined && userData.password !== undefined) {
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

        const expireTime = '2h'
        const token = jwt.sign(userObj, process.env.SECRET_KEY, { expiresIn: expireTime })

        resolve({ success: true, message: `Pomyślnie zarejestrowano się! Skopiuj poniższy link do przeglądarki w celu potwierdzenia konta: http://localhost:3000/api/user/confirm/${token} Uwaga: link jest ważny przez ${expireTime}`, result: userObj })
      }
      else {
        resolve({ success: false, message: 'nie podano wymaganych danych' })
      }

    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { register }