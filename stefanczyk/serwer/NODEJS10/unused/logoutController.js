// * funkcje do pracy z aplikacją
// ---
//* logout

// const logger = require('tracer').colorConsole()
const utils = require('./utils')
const { tokenBlacklist } = require('./model')

const logout = async (token) => {
  const decoded = await utils.verifyToken(token)
  return new Promise((resolve, reject) => {
    try {
      if (decoded.success) {
        tokenBlacklist.push(token)

        resolve({ success: true, message: 'Pomyślnie wylogowano' })
      } else {
        resolve(decoded) // wtedy jest coś nie tak z tokenem
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { logout }
