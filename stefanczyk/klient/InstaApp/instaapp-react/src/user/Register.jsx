import { useState } from 'react'
import { ChakraProvider, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

// event.preventDefault()

const Register = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)

  const registerUser = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({
      name, lastName, email, password
    })
    try {
      const headers = { 'Content-Type': 'application/json' }
      const result = await fetch('http://localhost:5000/api/user/register', { method: 'POST', headers, body }) // tu ma być nasze IP z cmd
      console.log(await result.json())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ChakraProvider>
      <form onSubmit={(e) => registerUser(e)}>
        <Input required placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <Input required placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
        <Input type='email' required placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
        <InputGroup>
          <Input type={showPass ? 'text' : 'password'} required placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <InputRightElement>
            <Button onClick={() => setShowPass(!showPass)}>
              {showPass ? 'Hide' : 'Show'}
              {/* jeśli showPass jest false, to pokazuje Show, jest showPass jest true, to pokazuje Hide */}
              {/* tak samo jest type password, jesli show jest false, a typem text, gdy show jest true */}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button type='submit'>Submit</Button>
      </form>
    </ChakraProvider>
  )
}

export default Register
