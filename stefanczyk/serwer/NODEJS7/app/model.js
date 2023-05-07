//* dane dla aplikacji

let fileID = 0
const imagesArr = []

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

const setTagID = (noweID) => {
  tagID = noweID
} //! dzięki tym funkcjom jestem w stanie dynamicznie przydzielać i odczytywać wartość tagID

const getFileID = () => {
  return fileID
}

const setFileID = (noweID) => {
  fileID = noweID
}

module.exports = { imagesArr, rawTagsArr, fileID, tagID, convertedTagsArr, getTagID, setTagID, getFileID, setFileID }
