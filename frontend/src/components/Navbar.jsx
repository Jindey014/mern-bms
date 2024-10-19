import React from 'react'
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'
import { AddIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  //   const bg = useColorModeValue('light', 'gray.800')
  return (
    <>
      <Container maxW="container.xl" h={20}>
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          direction={{ base: 'column', lg: 'row', md: 'row' }}
          p={2}
        >
          <Link to="/">
            <Text
              as={'b'}
              fontSize={{ base: 32, lg: '40', md: '40' }}
              textAlign={'center'}
            >
              Book Management System
            </Text>
          </Link>
          <HStack spacing={'4'} alignItems={'center'} mt={{ base: 2 }}>
            <Link to="/create">
              <Tooltip
                label="Create new Book Entry"
                bg={useColorModeValue('#2c2c2c', '#ffffffff')}
              >
                <Button>
                  <AddIcon />
                </Button>
              </Tooltip>
            </Link>
            <Tooltip
              label="Toggle Background"
              bg={useColorModeValue('#2c2c2c', '#ffffff')}
            >
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Tooltip>
          </HStack>
        </Flex>
      </Container>
    </>
  )
}

export default Navbar
