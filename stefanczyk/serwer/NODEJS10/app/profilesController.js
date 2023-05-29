// * funkcje do pracy z aplikacją
// ---
//* profile

const utils = require('./utils')
// const logger = require('tracer').colorConsole()

const getProfileData = async (token) => {
  const decoded = await utils.verifyToken(token)
  return new Promise((resolve, reject) => {
    try {
      if (decoded.success) {
        // TODO

        // const userAccount = confirmUserAccount(decoded.result.id)

        // resolve({ success: true, message: 'Konto zostało potwierdzone', result: userAccount })
      } else {
        resolve(decoded) // wtedy jest coś nie tak z tokenem
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getProfileData }
