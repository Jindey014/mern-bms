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
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBookStore } from '../store/bookStore'

const CreatePage = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
  })
  const navigate = useNavigate()
  const toast = useToast()

  const { createBook } = useBookStore()
  const handleAddBook = async (e) => {
    e.preventDefault()
    const { success, message } = await createBook(newBook)
    if (success) {
      toast({
        title: 'New Entry created sucessfully',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/')
    } else {
      toast({
        title: 'Error in creating new Entry',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    setNewBook({
      name: '',
      author: '',
    })
  }

  return (
    <>
      <Container maxW={'container.xl'} mt={12} p={6} h={'100vh'}>
        <VStack spacing={8}>
          <Heading>Create New Entry</Heading>
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
                  value={newBook.name}
                  onChange={(e) =>
                    setNewBook({ ...newBook, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Author Name :</FormLabel>
                <Input
                  placeholder="Enter the Author's name"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                />
              </FormControl>
              <HStack minW={'100%'} spacing={4}>
                <Button colorScheme="blue" onClick={handleAddBook}>
                  Add Product
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

export default CreatePage
