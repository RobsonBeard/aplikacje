import { Flex, Box, Avatar, Text, Button, Input, useDisclosure } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import PostProfilePicture from '../actions/PostProfilePicture'

const AccountPage = ({ boolean, setBoolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [editing, ifEditing] = useState(false)

  const [newName, setNewName] = useState('')
  const [newLastName, setNewLastName] = useState('')

  const [previousName, setPreviousName] = useState('')
  const [previousLastName, setPreviousLastName] = useState('')
  const [previousEmail, setPreviousEmail] = useState('')

  const updateUserData = async (e) => {
    e.preventDefault()
    // console.log(newName, newLastName)
    const body = JSON.stringify({
      name: newName,
      lastName: newLastName
    })
    try {
      const headers = { 'Content-Type': 'application/json' }
      const response = await fetch('http://localhost:3000/api/profile', { method: 'PATCH', body, headers, credentials: 'include' }) // tu ma być nasze IP z cmd
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
    // ! normalnie jestem w stanie wykonać funckję patcha zmiany danych na serwerze, jednak ona nic nie robi, bo w tokenie (ciasteczku) nadal są te stare dane, które trzeba zmienić
    // w tokenie mają być rzeczy, które się nie zmieniają, czyli nie powinno być tam name i lastname, tylko sam email (i hasło??), zmienic sposob na serwerze
    getUserData()
    ifEditing(false)
  }

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/profile', { method: 'GET', credentials: 'include' }) // tu ma być nasze IP z cmd
      const result = await response.json()
      // console.log(result)
      setPreviousName(result.result.name)
      setPreviousLastName(result.result.lastName)
      setPreviousEmail(result.result.email)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Box border='2px' padding='10px' width='xl' height='md' borderRadius='md'>
      <Flex gap='10px'>
        <Avatar src={`http://localhost:3000/api/profile/getmypfp?${Math.floor(Math.random() * 1000000)}`} width='150px' h='150px' objectFit='cover' />
        {/*  math random jest potrzebny, zeby przegladarka pobierala nowo ustawione zdjecie, tak samo regex na serwerze */}
        <Flex direction='column' textAlign='right' gap='10px' h='150px' justify='space-evenly' fontSize='xl'>
          <Text>Name: </Text>
          <Text>Last Name: </Text>
          <Text>Email: </Text>
        </Flex>
        {!editing
          ? (
            <Flex direction='column' textAlign='left' gap='10px' h='150px' justify='space-evenly' fontSize='xl'>
              <Text>{previousName}</Text>
              <Text>{previousLastName}</Text>
              <Text>{previousEmail}</Text>
            </Flex>)
          : (
            <form action='' id='editing-profile-data-form' name='editing-profile-data-form' onSubmit={(e) => updateUserData(e)}>
              <Flex direction='column' textAlign='left' gap='10px' h='150px' justify='space-evenly' fontSize='xl'>
                <Input required placeholder='New name' name='new-name' id='new-name' autoComplete='given-name' onChange={(e) => setNewName(e.target.value)} />
                <Input required placeholder='New last name' name='new-lastname' id='new-lastname' autoComplete='family-name' onChange={(e) => setNewLastName(e.target.value)} />
                <Text>{previousEmail}</Text>
              </Flex>
            </form>)}
      </Flex>
      {!editing
        ? (<Button onClick={() => ifEditing(!editing)}>Update profile data</Button>)
        : (
          <Flex gap='10px'>
            <Button onClick={() => ifEditing(!editing)}>Quit editing</Button>
            <Button onClick={onOpen}>Change profile picture</Button>
            <Button form='editing-profile-data-form' type='submit'>Update your profile</Button>
          </Flex>)}
      <PostProfilePicture isOpenModal={isOpen} closeModal={onClose} boolean={boolean} setBoolean={setBoolean} />
    </Box>
  )
}

export default AccountPage
