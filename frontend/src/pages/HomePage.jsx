import { Container, Heading, VStack, Text, Divider } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useBookStore } from '../store/bookStore'
import { Link } from 'react-router-dom'
import BookTable from '../components/BookTable'

const HomePage = () => {
  const { getBooks, books } = useBookStore()

  useEffect(() => {
    getBooks()
  }, [getBooks])

  return (
    <>
      <Container maxW={'container.xl'} mt={12} p={6} h={'100vh'}>
        <VStack>
          <Heading>List of Books</Heading>
          <BookTable />
          {books.length === 0 && (
            <Text>
              No Books Available...
              <Link to="/create">
                <Text
                  as={'span'}
                  color={'blue.200'}
                  _hover={{ color: "'blue.800'" }}
                  fontWeight={'bold'}
                >
                  {' '}
                  Create new book entries here
                </Text>
              </Link>
            </Text>
          )}
        </VStack>
      </Container>
    </>
  )
}

export default HomePage
