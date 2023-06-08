import { Avatar, Card, CardHeader, Image, Flex, Heading, CardBody } from '@chakra-ui/react'

const Publication = ({ imgSrc }) => {
  return (
    <Card border='2px' width='md'>
      <CardHeader borderBottom='1px'>
        <Flex align='center' gap='3'>
          <Avatar name='' src='' />
          <Heading size='sm'>Nazwa uzytkownika</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Image src={imgSrc} objectFit='contain' width='500px' maxHeight='500px' alt='MainPage photo' />
      </CardBody>

    </Card>
  )
}

export default Publication
