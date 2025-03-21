import React, { useState, useEffect } from "react";
import { Box, Center, Flex, Text, Card, CardBody, Stack, Avatar, Button, Input } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send,MessageCircleMore, MessageCircle, X } from "lucide-react";
import axios from "axios";
import "./styles.css";

const API_URL = "https://the-coding-crusaders-default-rtdb.firebaseio.com/";

const AnimatedCard = motion(Card);

const TenantLandlordUI = () => {
  const [tenants, setTenants] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/tenants.json`)
      .then((response) => {
        if (response.data) {
          setTenants(Object.values(response.data).slice(0, 8));
        }
      })
      .catch((error) => console.error("Error fetching tenants: ", error));

    axios.get(`${API_URL}/landlords.json`)
      .then((response) => {
        if (response.data) {
          setLandlords(Object.values(response.data).slice(0, 6));
        }
      })
      .catch((error) => console.error("Error fetching landlords: ", error));
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, sender: "You" };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <Box className="container">
     
      <h1>Tenants</h1>
      <Flex wrap="wrap" justifyContent="center" className="card-container">
        {tenants.map((user, index) => (
          <AnimatedCard
            key={index}
            className="card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedUser(user)}
          >
            <CardBody>
              <Stack align="center">
                <Avatar size="xl" name={user.name} src={user.avatar} />
                <Text className="name">{user.name}</Text>
                <Text className="email">{user.email}</Text>
                <Text className="phone">{user.phone}</Text>
                <Button className="view-btn"><MessageCircleMore /></Button>
              </Stack>
            </CardBody>
          </AnimatedCard>
        ))}
      </Flex>

      <h1 style={{marginTop:"20px"}}>Landlords</h1>
      <Flex wrap="wrap" justifyContent="center" className="card-container">
        {landlords.map((user, index) => (
          <AnimatedCard
            key={index}
            className="card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedUser(user)}
          >
            <CardBody>
              <Stack align="center">
                <Avatar size="xl" name={user.name} src={user.avatar} />
                <Text className="name">{user.name}</Text>
                <Text className="email">{user.email}</Text>
                <Text className="phone">{user.phone}</Text>
                {user.properties && (
                  <Text className="properties">Properties: {user.properties.join(", ")}</Text>
                )}
                <Button className="view-btn"><MessageCircleMore /></Button>
              </Stack>
            </CardBody>
          </AnimatedCard>
        ))}
      </Flex>

      <AnimatePresence>
        {selectedUser && (
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Box className="details-card">
              <Avatar size="xl" name={selectedUser.name} src={selectedUser.avatar} />
              <Text className="name">{selectedUser.name}</Text>
              <Text className="email">{selectedUser.email}</Text>
              <Text className="phone">{selectedUser.phone}</Text>
              {selectedUser.properties && (
                <Text className="properties">Properties: {selectedUser.properties.join(", ")}</Text>
              )}
              
              <Box className="chat-box">
                <Text className="chat-heading">Chat with {selectedUser.name}</Text>
                <Box className="chat-messages">
                  {messages.map((msg, index) => (
                    <Text key={index} className="chat-message">{msg.sender}: {msg.text}</Text>
                  ))}
                </Box>
                <Flex mt={3} className="chat-input-container">
                  <Input
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chat-input"
                  />
                  <Button ml={2} colorScheme="blue" onClick={sendMessage} className="chat-send-btn">
                    <Send size={18} />
                  </Button>
                </Flex>
              </Box>
              
              <Button className="close-btn" onClick={() => setSelectedUser(null)}><X /></Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default TenantLandlordUI;