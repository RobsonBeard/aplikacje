import { useEffect, useState } from 'react'

const HomePage = () => {
  const [imagesArr, setImagesArr] = useState([])

  const getImages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/photos', { method: 'GET', credentials: 'include' }) // tu ma być nasze IP z cmd
      const result = await response.json()
      console.log(result)
      setImagesArr(result.result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <>{imagesArr && imagesArr.map((elem, i) => { return <img src={`http://localhost:3000/api/getfile/${elem.id}`} key={i} /> })}</>
  )
}

export default HomePage
