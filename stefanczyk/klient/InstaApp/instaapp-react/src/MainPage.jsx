import { Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'

const MainPage = ({ logout }) => {
  return (
    <>
      <Flex width='100%' height='10%' justify='center'>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Upload an image</BreadcrumbLink>
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
          <Route path='/' element={<Flex justify='center' margin='10px'><HomePage /></Flex>} />
          <Route path='*' element={<p>Page not found</p>} />
        </Routes>
      </Router>

    </>
  )
}

export default MainPage
