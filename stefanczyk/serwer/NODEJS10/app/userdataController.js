// * funkcje do pracy z aplikacją
// ---
//* dane użytkowników

const { usersArr } = require('./model')

const getOneUser = (selectedID) => {
  return new Promise((resolve, reject) => {
    try {
      if (usersArr.length === 0) {
        resolve({ success: false, message: 'nie ma userów' })
      }
      const selectedUser = usersArr.find((elem) => elem.id === selectedID)
      if (selectedUser === undefined) {
        resolve({ success: false, message: 'nie ma usera o podanym id' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: selectedUser })
    } catch (error) {
      reject(error)
    }
  })
}

const getUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      if (usersArr.length === 0) {
        resolve({ success: false, message: 'tablica userów jest pusta' })
      }
      resolve({ success: true, message: 'operacja powiodła się', result: usersArr })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { getUsers, getOneUser }
