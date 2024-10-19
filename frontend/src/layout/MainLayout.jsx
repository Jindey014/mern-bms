import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { Box, useColorModeValue } from '@chakra-ui/react'

const MainLayout = () => {
  return (
    <>
      <Box h={'100%'} bg={useColorModeValue('#e9ecef', '#2c2c2c')}>
        <Navbar />
        <Outlet />
      </Box>
    </>
  )
}

export default MainLayout
