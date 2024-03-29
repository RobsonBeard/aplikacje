import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useDisclosure, Avatar, Link } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './HomePage'
import PostImage from './actions/PostImage'
import AccountPage from './user/AccountPage'

const MainPage = ({ logout, setToken }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [imagesArr, setImagesArr] = useState([])

  const [boolean, setBoolean] = useState(false)
  // to jest do tego żeby się zmienił state i wtedy zaktualizowało awatar w rogu

  const getImages = async () => {
    try {
      const getImagesFetch = await fetch('http://localhost:3000/api/photos', { method: 'GET', credentials: 'include' }) // tu ma być nasze IP z cmd
      const getImagesResult = await getImagesFetch.json()
      // console.log(getImagesResult)
      setImagesArr(getImagesResult.result) // asynchroniczne
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Flex width='100%' height='6vh' justify='center' align='center' bgColor='rgb(240,240,240)'>
        <Breadcrumb fontSize='2vh' fontWeight='semibold' spacing='20px'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={onOpen}>Upload an image</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='/account'>Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={logout}>Logout</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Link href='/account' padding='0' margin='0' position='absolute' right='0' width='5vh' height='5vh'>
          <Avatar src={`http://localhost:3000/api/profile/getmypfp?${Math.floor(Math.random() * 1000000)}`} objectFit='cover' />
        </Link>

        {/* math random jest potrzebny, zeby przegladarka pobierala nowo ustawione zdjecie, tak samo regex na serwerze */}
      </Flex>
      {/* <Button onClick={logout}>Logout</Button> */}
      {/* moze dorobic potem ten logout tez na serwerze? nie wiem, jest problem troche np. z wysylem zdjec gdy sie restartuje serwer, bo cookie nadal jest wazne */}

      <Router>
        <Routes>
          <Route
            path='/account' element={
              <Flex justify='center' margin='10px'>
                <AccountPage boolean={boolean} setBoolean={setBoolean} />
              </Flex>
            }
          />
          <Route
            path='/' element={
              <Flex justify='center' margin='10px'>
                <HomePage imagesArr={imagesArr} setImagesArr={setImagesArr} getImages={getImages} />
              </Flex>
            }
          />
          <Route path='*' element={<p>Page not found</p>} />
        </Routes>
      </Router>

      <PostImage isOpenModal={isOpen} closeModal={onClose} getImages={getImages} />

    </>
  )
}

export default MainPage
