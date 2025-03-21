import React, { useState, useEffect } from "react";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import { Box, Center, Flex, Image,Text } from "@chakra-ui/react";
import TenantLandlordUI from "./TenantLandlordUI";



const images = [photo1, photo2, photo3];

const Main2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="700px" overflow="hidden" marginTop="10px">
      <Image src={images[currentIndex]} alt="Slide" boxSize="700px" w="95%" />

    </Box>
     <Center style={{ fontSize:"30px", margin:"50px",textAlign:"center",fontFamily:"cursive"}}>Experience property management reimagined—where every conversation, document, and transaction  <br />lives in perfect harmony..</Center>


    <Box  padding="20px" marginBottom={20} marginTop={10} >
  
    </Box>

    <h1 style={{fontFamily:"cursive", textDecoration:"none"}}>Tenant & Landlord Details</h1>
    <TenantLandlordUI/>
     
  
    </>

    
  );
};

export default Main2;