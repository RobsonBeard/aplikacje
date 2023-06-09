import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useDisclosure } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './HomePage'
import PostImage from './actions/PostImage'

const MainPage = ({ logout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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

  return (
    <>
      <Flex width='100%' height='10%' justify='center'>
        <Breadcrumb>
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
      </Flex>
      {/* <Button onClick={logout}>Logout</Button> */}
      {/* moze dorobic potem ten logout tez na serwerze? nie wiem, jest problem troche np. z wysylem zdjec gdy sie restartuje serwer, bo cookie nadal jest wazne */}

      <Router>
        <Routes>
          <Route path='/account' element={<p>1</p>} />
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
