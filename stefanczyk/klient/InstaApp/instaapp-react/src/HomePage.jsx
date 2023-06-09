import { useEffect } from 'react'
import Publication from './Publication'
import { Heading, Stack } from '@chakra-ui/react'

const HomePage = ({ imagesArr, setImagesArr, getImages }) => {
  useEffect(() => {
    getImages()
  }, [])

  return (
    <Stack direction='column' gap='15px'>
      {imagesArr
        ? imagesArr.map((elem, i) => { return <Publication imgSrc={`http://localhost:3000/api/getfile/${elem.id}`} userId={elem.album} key={i} /> })

        : <Heading>We're waiting for your uploads!</Heading>}
    </Stack>
  )
}

export default HomePage
