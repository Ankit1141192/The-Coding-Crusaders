import React, { useState } from 'react';
import "./chatbot.css";
import { IoSend } from 'react-icons/io5';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TbMessageChatbot } from 'react-icons/tb';
import { X } from 'lucide-react';

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const generateResponse = async (msg) => {
    if (!msg) return;
    
    const genAI = new GoogleGenerativeAI("AIzaSyBBPUkwj0hkz7lgXKGE5-eDzmXchCWl89c");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    
    const newMessages = [
      ...messages,
      { type: "user", text: msg },
      { type: "bot", text: result.response.text() },
    ];
    
    setMessages(newMessages);
    setMessage("");
  };

  return (
    <div className="chat-container">
      {!isChatOpen ? (
        <div className="chat-icon" onClick={() => setIsChatOpen(true)}>
          <TbMessageChatbot size={40} />
        </div>
      ) : (
        <div className="chatbox">
          <div className="chat-header">
            <h2>How can assist you?</h2>
            <button onClick={() => setIsChatOpen(false)} style={{fontSize:"20px",fontWeight:"bold",background:"none",color:"white"}}><X /></button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.type === "user" ? "user-message" : "bot-message"}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input 
              type="text" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Type a message..." 
            />
            <button onClick={() => generateResponse(message)} disabled={!message.trim()}>
              <IoSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;