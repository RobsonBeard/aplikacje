import { useState } from 'react'
import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
// event.preventDefault()

const Register = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPass, setShowPass] = useState(false)

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [confirmLink, setConfirmLink] = useState('')

  const registerUser = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({
      name, lastName, email, password
    })
    try {
      const headers = { 'Content-Type': 'application/json' }
      const response = await fetch('http://localhost:3000/api/user/register', { method: 'POST', headers, body }) // tu ma być nasze IP z cmd
      const result = await response.json()
      console.log(result)
      if (result.status.toString()[0] === '4') { // jeśli status zaczyna się na 4, to wyświetl błąd
        setSuccess('')
        setError(result.message)
      } else {
        setSuccess(result.message)
        setConfirmLink(result.link)
        setError('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={(e) => registerUser(e)} id='registerForm' name='registerForm'>
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
      {
        success !== '' && (
          <Alert status='success'>
            <AlertIcon />
            <AlertTitle>Successfully registered!</AlertTitle>
            <AlertDescription>
              <p>{success}</p>
              <Link href={confirmLink} isExternal>
                Click <ExternalLinkIcon />
              </Link>
            </AlertDescription>
            <CloseButton onClick={() => { setSuccess('') }} />
          </Alert>
        )
      }
      {
        error !== '' && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Failed to register</AlertTitle>
            <AlertDescription>{error}

            </AlertDescription>
            <CloseButton onClick={() => { setError('') }} />
          </Alert>
        )
      }
    </>
  )
}

export default Register
