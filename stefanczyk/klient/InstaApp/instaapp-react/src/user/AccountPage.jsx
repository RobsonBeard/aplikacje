import { Flex, Box, Avatar, Text, Button } from '@chakra-ui/react'

const AccountPage = () => {
  return (
    <Box border='2px' padding='10px' width='xl' height='md' borderRadius='md'>
      <Flex gap='10px'>
        <Avatar width='150px' h='150px' objectFit='cover' />
        <Flex direction='column' textAlign='right' gap='10px' h='150px' justify='space-evenly'>
          <Text fontSize='xl'>Name: </Text>
          <Text fontSize='xl'>Last Name: </Text>
          <Text fontSize='xl'>Email: </Text>
        </Flex>
        <Flex direction='column' textAlign='left' gap='10px' h='150px' justify='space-evenly'>
          <Text fontSize='xl'>Name</Text>
          <Text fontSize='xl'>Last Name</Text>
          <Text fontSize='xl'>email@default.com</Text>
        </Flex>
      </Flex>
      <Button>siema</Button>
    </Box>
  )
}

export default AccountPage
