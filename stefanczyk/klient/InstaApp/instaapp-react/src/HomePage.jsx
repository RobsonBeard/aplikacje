import { useEffect, useState } from 'react'
import Publication from './Publication'
import { Heading, Stack } from '@chakra-ui/react'

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
    <Stack direction='column' gap='15px'>
      {imagesArr
        ? imagesArr.map((elem, i) => { return <Publication imgSrc={`http://localhost:3000/api/getfile/${elem.id}`} key={i} /> })

        : <Heading>We're waiting for your uploads!</Heading>}
    </Stack>
  )
}

export default HomePage
