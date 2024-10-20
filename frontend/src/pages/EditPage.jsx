import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  useColorModeValue,
  FormLabel,
  FormControl,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

const EditPage = () => {
  const { id } = useParams()
  const { getBook, book, updateBook } = useBookStore()
  const [updatedBook, setUpdatedBook] = useState(book)
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    getBook(id)
  }, [getBook])

  const handleUpdateBook = async (updatedBook) => {
    const { success, message } = await updateBook(updatedBook)
    if (success) {
      toast({
        title: 'Updated Successfully',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/')
    } else {
      toast({
        title: 'Error in Updating Entry',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }
  return (
    <>
      <Container maxW={'container.xl'} mt={12} p={6} h={'100vh'}>
        <VStack spacing={8}>
          <Heading>Update Book Entry</Heading>
          <Box
            bg={useColorModeValue('#f8f9fa', '#353535')}
            padding={6}
            rounded={'2xl'}
            w={{ base: '100%', md: '50%' }}
            shadow={'lg'}
          >
            <VStack spacing={8}>
              <FormControl>
                <FormLabel>Book Name :</FormLabel>
                <Input
                  placeholder="Enter the book name"
                  value={updatedBook.name}
                  onChange={(e) =>
                    setUpdatedBook({ ...updatedBook, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Author Name :</FormLabel>
                <Input
                  placeholder="Enter the Author's name"
                  value={updatedBook.author}
                  onChange={(e) =>
                    setUpdatedBook({ ...updatedBook, author: e.target.value })
                  }
                />
              </FormControl>
              <HStack minW={'100%'} spacing={4}>
                <Button
                  colorScheme="blue"
                  onClick={() => handleUpdateBook(updatedBook)}
                >
                  Update Book
                </Button>
                <Link to={'/'}>
                  <Button>Go back to Homepage</Button>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </>
  )
}

export default EditPage
