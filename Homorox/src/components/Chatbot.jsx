import React, { useState } from "react";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { Send } from "lucide-react";
import "./chatbot.css";

const API_KEY = "AIzaSyCjp7X6_iaLbbPRkxxiRCo1NfgqhDMR8ZY";
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateMessage";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "You", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: input }] }]
        }
      );
      
      const botMessage = {
        sender: "AI",
        text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't understand."
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [...prevMessages, { sender: "AI", text: "Error retrieving response. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="chatbot-container">
      <VStack className="chat-messages" spacing={3}>
        {messages.map((msg, index) => (
          <Text key={index} className={`chat-message ${msg.sender === "You" ? "user-message" : "bot-message"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </Text>
        ))}
      </VStack>
      <Box className="chat-input-container">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
        />
        <Button onClick={sendMessage} isLoading={loading} className="chat-send-btn">
          <Send size={18} />
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;