import { Avatar, Card, CardHeader, Image, Flex, Heading, CardBody } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const Publication = ({ imgSrc, userId }) => {
  const [userEmail, setUserEmail] = useState('')

  const getUserEmail = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/userdata/${userId}`, { method: 'GET', credentials: 'include' }) // tu ma być nasze IP z cmd
      const result = await response.json()
      // console.log(result)
      setUserEmail(result.result.email)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserEmail()
  }, [])

  return (
    <Card border='2px' width='md'>
      <CardHeader borderBottom='1px'>
        <Flex align='center' gap='3'>
          <Avatar name='' src='' />
          <Heading size='sm'>{userEmail}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Image src={imgSrc} objectFit='contain' width='500px' maxHeight='500px' alt='MainPage photo' />
      </CardBody>

    </Card>
  )
}

export default Publication
