import React, { useState, useEffect } from "react";
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import seller from "../assets/seller.png";
import  tools from "../assets/tools.png";
import message from "../assets/messages.png";
import faqs from "../assets/faqs.png";
import { Box, Center, Flex, Image,Text } from "@chakra-ui/react";


const images = [photo1, photo2, photo3];

const Main1 = () => {
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
     <Center style={{ fontSize:"30px", margin:"50px",textAlign:"center",fontFamily:"cursive"}}>Homorax simplifies tenant and landlord communication by centralizing everything in one place, <br />  ensuring seamless interaction and efficiency.</Center>


    <Box  padding="20px" marginBottom={20} marginTop={10} >
    <Flex justifyContent="center" alignItems="center" gap="50px" marginTop="50px">
        <Box  id="box1">
            <img src={message} alt="" height="100px"  />
            <Text fontWeight="bold" fontSize="xl" textAlign="center">Internal Messaging</Text>
            <Text textAlign="center">Real-time messaging between tenants, <br /> landlords, and agents.</Text>    
        </Box>
        <Box id="box1" >
        <img src={seller} alt="" height="100px"  />
        <Text fontWeight="bold" fontSize="xl" textAlign="center">Everyone in the Loop</Text>
        <Text textAlign="center">Streamlined communication that keeps <br /> all parties in sync.</Text>
        </Box>
    </Flex>
    
    <Flex justifyContent="center" alignItems="center" gap="50px" marginTop="50px">
        <Box id="box1" >
        <img src={tools} alt ="" height="100px"  />
        <Text fontWeight="bold" fontSize="xl" textAlign="center">Report and Fix Issues</Text>
        <Text textAlign="center">Quickly report and resolve issues with <br /> clear communication.</Text>     
        </Box>
        <Box id="box1">
            <img src={faqs} alt="" height="100px"  />
            <Text fontWeight="bold" fontSize="xl" textAlign="center">Personalized FAQs</Text>
            <Text textAlign="center">Get personalized FAQs about your <br /> property.</Text>
        </Box>
    </Flex>
    
    </Box>
    
    </>
    
  );
};

export default Main1;