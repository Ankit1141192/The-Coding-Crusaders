import React from "react";
import Navbar1 from "./Navbar1";
import Main2 from "../components/Main2";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Bot from "../components/Bot";



export default function Home() {
  return (
    <div>
      <Navbar1 />
       <Main2 />
       <Chatbot/>
      <Footer/>
    </div>
  );
}
