import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Button } from '@chakra-ui/react'
import { useState } from 'react'

const PostImage = ({ isOpenModal, closeModal, getImages }) => {
  const [image, setImage] = useState(undefined)

  const sendImage = async (e) => {
    e.preventDefault()
    const body = new FormData()
    body.append('file', image)
    try {
      const response = await fetch('http://localhost:3000/api/photos', { method: 'POST', body, credentials: 'include' }) // tu ma być nasze IP z cmd
      const result = await response.json()
      console.log(result)
      closeModal()
      getImages()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal isOpen={isOpenModal} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post your favourite image</ModalHeader>
        <form onSubmit={(e) => sendImage(e)}>
          <ModalBody>
            <Input type='file' name='post-image' id='post-image' required onChange={(e) => setImage(e.target.files[0])} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' type='submit'>Post</Button>
            <Button variant='ghost' onClick={closeModal}>Close</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PostImage
