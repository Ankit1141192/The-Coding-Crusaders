import React from "react";
import { Box, Button, Flex, Link, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <Box w="100%"  px={8} py={4} color="white" id="navbar" >
      <Flex justifyContent="space-between" alignItems="center">
      
        <Box marginLeft="30px">
          <Image src={logo} alt="logo" boxSize="70px" w = "100%" />
        </Box>

        <Flex gap={40} marginRight="30px">
          
          <Button as={RouterLink} to="/register"  variant="ghost" _hover={{ bg: "blue.500" }} id="register" padding="10px 20px" bg="red" color="white" fontWeight="bold" borderRadius="20px">
            Register
          </Button>
          <Button as={RouterLink} to="/login"  variant="ghost" _hover={{ bg: "blue.500" }} id = "login" padding="10px 20px" bg="navy" color="white" borderRadius="20px" fontWeight="bold">
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
