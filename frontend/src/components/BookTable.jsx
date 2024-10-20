import React, { useEffect, useState } from 'react'
import { useBookStore } from '../store/bookStore'
import { nanoid } from 'nanoid'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
  Button,
  HStack,
  Tooltip,
  Box,
  useToast,
} from '@chakra-ui/react'
import { Link, useLoaderData } from 'react-router-dom'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const BookTable = () => {
  const toast = useToast()

  const { getBooks, books, deleteBook } = useBookStore()

  const handleDeleteBook = async (id) => {
    const { success, message } = await deleteBook(id)
    if (success) {
      toast({
        title: 'Delete Successfully',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Error in deleting Entry',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    getBooks()
  }, [getBooks])
  //FOR PAGINATION
  const itemsPerPage = 3
  const [currentPage, setCurrentPage] = useState(1)

  //caculate total pages
  const totalPages = Math.ceil(books.length / itemsPerPage)

  //set current items
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentItems = books.slice(startIndex, startIndex + itemsPerPage)

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return (
    <>
      {/* {books.map((book) => (
        <div>{book.name}</div>
      ))} */}
      <TableContainer
        bg={useColorModeValue('#f8f9fa', '#353535')}
        p={2}
        rounded={'xl'}
      >
        <Table>
          <Thead>
            <Tr>
              <Th>Book Name</Th>
              <Th>Author Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((book) => (
              <Tr key={book._id}>
                <Td>{book.name}</Td>
                <Td>{book.author}</Td>
                <Td>
                  <HStack padding={2}>
                    <Tooltip
                      label="Edit Details"
                      bg={useColorModeValue('#2c2c2c', '#ffffffff')}
                    >
                      <Link to={`/edit/${book._id}`}>
                        <Button colorScheme="blue">
                          <EditIcon />
                        </Button>
                      </Link>
                    </Tooltip>
                    <Tooltip
                      label="Delete Book"
                      bg={useColorModeValue('#2c2c2c', '#ffffffff')}
                    >
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <HStack spacing={4} mt={4} p={2} justifyContent={'center'}>
          <Button onClick={handlePrevPage} isDisabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      </TableContainer>
    </>
  )
}

export default BookTable
