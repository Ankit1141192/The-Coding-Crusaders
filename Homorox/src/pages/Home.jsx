import React, { useEffect } from 'react';
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Link as RouterLink, Outlet, useNavigate, Routes, Route } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import Main2 from '../components/Main2';

const Home = () => {
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();
  const navigateToProfile = () => navigate("/home/profile");
  

 
  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true }); 
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <Box w="100%" px={8} py={4} color="white" id="navbar">
      <Flex justifyContent="space-between" alignItems="center">
        
        {/* Logo Section */}
        <Box marginLeft="30px">
          <Image src={logo} alt="logo" boxSize="70px" w="100%" />
        </Box>

        {/* Navigation Section */}
        <Flex gap={8} marginRight="30px">
          <Button as={RouterLink} to="/home" colorScheme="teal">Home</Button>
          <Button as={RouterLink} to="/home/profile" colorScheme="blue">Profile</Button>
          <Button as={RouterLink} to="/login" colorScheme="red">Logout</Button>
        </Flex>
      </Flex>
    </Box>
      <Routes>
        <Route path="/home" element={<Outlet />} />
        <Route path="/home/profile" element={<Box>Profile</Box>} />
      </Routes>
    <Main2 />
    </div>
  );
}

export default Home;
