import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Input, ModalFooter, Button } from '@chakra-ui/react'

const PostImage = ({ open, close }) => {
  const sendImage = (e) => {
    e.preventDefault()
  }
  return (
    <Modal isOpen={open} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Post your favourite image</ModalHeader>
        <form onSubmit={(e) => sendImage(e)}>
          <ModalBody>
            <Input type='file' />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' type='submit'>Post</Button>
            <Button variant='ghost' onClick={close}>Close</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PostImage
