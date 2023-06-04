import { ChakraProvider } from '@chakra-ui/react'
import Register from './user/Register'

const MainPage = () => {
  return (
    <ChakraProvider>
      <Register />
    </ChakraProvider>
  )
}

export default MainPage
