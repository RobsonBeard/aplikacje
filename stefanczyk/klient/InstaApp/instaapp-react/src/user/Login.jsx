import { useState } from 'react'
import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)

  // const [success, setSuccess] = useState('') // nie wiem czy tego na razie uzywac, bo chce przekierowac do innej strony
  const [error, setError] = useState('')

  const loginUser = async (e) => {
    e.preventDefault() //* to wazne
    const body = JSON.stringify({
      email, password
    })
    try {
      const headers = { 'Content-Type': 'application/json' }
      const response = await fetch('http://localhost:3000/api/user/login', { method: 'POST', headers, body }) // tu ma być nasze IP z cmd
      const result = await response.json()
      // console.log(result)
      if (result.status.toString()[0] === '4') { // jeśli status zaczyna się na 4, to wyświetl błąd
        // setSuccess('')
        setError(result.message)
      } else {
        // setSuccess(result.message)
        // setConfirmLink(result.link)
        // console.log(result.result)
        setToken(result.result, result.expireTimeInMiliseconds)
        setError('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={(e) => loginUser(e)} id='loginForm' name='loginForm'>
        <Input type='email' required placeholder='E-mail' name='email' id='email' autoComplete='email' onChange={(e) => setEmail(e.target.value)} />
        <InputGroup>
          <Input type={showPass ? 'text' : 'password'} required placeholder='Password' name='password' id='password' autoComplete='current-password' onChange={(e) => setPassword(e.target.value)} />
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
      {
        error !== '' && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Failed to log in:</AlertTitle>
            <AlertDescription>{error}

            </AlertDescription>
            <CloseButton onClick={() => { setError('') }} />
          </Alert>
        )
      }
    </>
  )
}

export default Login
