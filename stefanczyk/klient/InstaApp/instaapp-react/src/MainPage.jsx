import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const MainPage = ({ logout }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/account'>Account</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Button onClick={logout}>Logout</Button>

      <Router>
        <Routes>
          <Route path='/account' element={<p>1</p>} />
          <Route path='/' element={<><p>2</p><img alt='zdjecie' src='http://localhost:5000/api/getfile/1' /></>} />
          <Route path='*' element={<p>nie znaleziono</p>} />
        </Routes>
      </Router>

    </>
  )
}

export default MainPage
