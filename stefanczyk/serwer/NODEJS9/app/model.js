//* dane dla aplikacji

let fileID = 0
const imagesArr = []

const getFileID = () => {
  return fileID
}

const setFileID = (newID) => {
  fileID = newID
}

let tagID = 0
const rawTagsArr = [
  '#love',
  '#instagood',
  '#fashion',
  '#photooftheday',
  '#art',
  '#photography',
  '#instagram',
  '#beautiful',
  '#picoftheday',
  '#nature',
  '#happy',
  '#cute',
  '#travel',
  '#style',
  '#followme',
  '#tbt',
  '#instadaily',
  '#repost',
  '#like4like',
  '#summer',
  '#beauty',
  '#fitness',
  '#food',
  '#selfie',
  '#me',
  '#instalike',
  '#girl',
  '#friends',
  '#fun',
  '#photo'
]
const convertedTagsArr = []

const getTagID = () => {
  return tagID
}

const setTagID = (newID) => {
  tagID = newID
} //! dzięki tym funkcjom jestem w stanie dynamicznie przydzielać i odczytywać wartość tagID

let userID = 0
const usersArr = []

const getUserID = () => {
  return userID
}

const setUserID = (newID) => {
  userID = newID
}

const confirmUserAccount = (ID) => {
  const selectedUser = usersArr.find(elem => elem.id === ID)
  selectedUser.confirmed = true
  return selectedUser
}

module.exports = { imagesArr, rawTagsArr, fileID, tagID, convertedTagsArr, usersArr, getTagID, setTagID, getFileID, setFileID, getUserID, setUserID, confirmUserAccount }
