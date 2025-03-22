import React, { useState, useEffect } from "react";
import { ref, get, push } from "firebase/database";
import "./voicebot.css";
import { db } from "../firebase/firebase"; 

const Voicebot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [commands, setCommands] = useState(null);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const snapshot = await get(ref(db, "Commands")); 
        if (snapshot.exists()) {
          setCommands(snapshot.val());
          console.log("✅ Commands loaded:", snapshot.val());
        } else {
          console.warn("⚠️ No commands found in Firebase.");
        }
      } catch (error) {
        console.error("❌ Error fetching commands:", error);
      }
    };
    fetchCommands();
  }, []);

  const getGreetingBasedOnTime = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good morning!";
    if (hours >= 12 && hours < 18) return "Good afternoon!";
    if (hours >= 18 && hours < 22) return "Good evening!";
    return "Good night!";
  };

  const handleCommands = (command) => {
    if (!commands) {
      console.error("⚠️ Commands not loaded from Firebase!");
      return;
    }

    command = command.toLowerCase().trim();
    console.log("🎤 User Command:", command);

    let responseText = "Sorry, I didn't understand that.";

    // ✅ Check if command exists in Firebase
    if (commands[command]) {
      responseText = commands[command]; // Fetch response from Firebase
    }

    // ✅ Recognizing greetings
    const greetings = ["good morning", "good afternoon", "good evening", "good night"];
    if (greetings.some((g) => command.includes(g))) {
      responseText = getGreetingBasedOnTime();
    }

    if (command.includes("hello")) {
      responseText = "Hello! How can I assist you today?";
    }

    // ✅ Opening Websites
    const siteCommands = {
      google: "https://www.google.com",
      youtube: "https://www.youtube.com",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://www.linkedin.com",
      github: "https://github.com",
      whatsapp: "https://web.whatsapp.com",
      "your developer profile": "https://www.linkedin.com/in/ankit1141",
    };

    Object.keys(siteCommands).forEach((key) => {
      if (command.includes(`open ${key}`)) {
        responseText = `Opening ${key}...`;
        window.open(siteCommands[key], "_blank");
      }
    });

    if (command.includes("play music")) {
      responseText = "Playing music on YouTube...";
      window.open("https://www.youtube.com/results?search_query=relaxing+music", "_blank");
    }

    if (command.includes("time")) {
      responseText = `The current time is: ${new Date().toLocaleTimeString()}`;
    }

    if (command.includes("date")) {
      responseText = `Today's date is: ${new Date().toLocaleDateString()}`;
    }

    // ✅ Save chat to Firebase
    push(ref(db, "ChatHistory"), { user: command, bot: responseText })
      .then(() => setChatHistory((prev) => [...prev, { user: command, bot: responseText }]))
      .catch((error) => console.error("❌ Error saving chat:", error));

    // ✅ Speak Response
    let speak = new SpeechSynthesisUtterance(responseText);
    speak.rate = 0.9;
    speak.lang = "en-IN";
    window.speechSynthesis.speak(speak);
  };

  const startVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("❌ Your browser doesn't support voice recognition.");
      return;
    }

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("🎤 Voice recognition started...");
    };

    recognition.onresult = (event) => {
      let spokenText = event.results[0][0].transcript.toLowerCase();
      console.log("🔊 Detected Voice:", spokenText);
      handleCommands(spokenText);
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech Recognition Error:", event.error);
    };

    recognition.onend = () => {
      console.log("🎤 Voice recognition ended.");
    };

    recognition.start();
  };

  return (
    <div id="chatContainer">
      <div id="chatBox">
        {chatHistory.length === 0 ? (
          <p>...</p>
        ) : (
          chatHistory.map((chat, index) => (
            <div key={index}>
              <p id="userText">👤 {chat.user}</p>
              <p id="botText">🤖 {chat.bot}</p>
            </div>
          ))
        )}
      </div>
      <button onClick={startVoiceInput} id="chatbtn">
        🎤 Start Voice
      </button>
    </div>
  );
};

export default Voicebot;
