import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './Main.css';
import forestImage from '../assets/forest.jpg';
import anndaata from '../assets/anndaata.jpg';

const Main = () => {
  const [showChat, setShowChat] = useState(false);

  // Define the steps for the chatbot
  const chatbotSteps = [
    // Step 1: Welcome Message
    {
      id: '1',
      message: 'Hello! Welcome to Anndaata. How can I assist you today?',
      trigger: 'options',
    },
  
    // Step 2: Main Menu Options
    {
      id: 'options',
      options: [
        { value: 'grains', label: 'Learn about grains', trigger: 'grains-info' },
        { value: 'buy', label: 'Buy grains', trigger: 'buy-grains-info' },
        { value: 'help', label: 'Need help', trigger: 'help-info' },
        { value: 'exit', label: 'End chat', trigger: 'end-chat' },
      ],
    },
  
    // Step 3: Learn About Grains
    {
      id: 'grains-info',
      message: 'We offer a variety of grains including wheat, rice, and mustard.',
      trigger: 'grains-menu',
    },
    {
      id: 'grains-menu',
      options: [
        { value: 'buy', label: 'Buy grains', trigger: 'buy-grains-info' },
        { value: 'more', label: 'Tell me more', trigger: 'grains-more-info' },
        { value: 'back', label: 'Go back to main menu', trigger: 'options' },
      ],
    },
    {
      id: 'grains-more-info',
      message: 'We also have organic grains available. Let me know what you need!',
      trigger: 'grains-menu',
    },
  
    // Step 4: Buy Grains Information
    {
      id: 'buy-grains-info',
      message: 'To buy grains, please visit our website or contact our support team.',
      trigger: 'buy-options',
    },
    {
      id: 'buy-options',
      options: [
        { value: 'help', label: 'Need help', trigger: 'help-info' },
        { value: 'back', label: 'Go back to main menu', trigger: 'options' },
      ],
    },
  
    // Step 5: Help Information
    {
      id: 'help-info',
      message: 'You can reach out to our support team at support@anndaata.com.',
      trigger: 'help-options',
    },
    {
      id: 'help-options',
      options: [
        { value: 'back', label: 'Go back to main menu', trigger: 'options' },
        { value: 'exit', label: 'End chat', trigger: 'end-chat' },
      ],
    },
  
    // Step 6: Exit the Chat
    {
      id: 'end-chat',
      message: 'Thank you for chatting with us at Anndaata. Have a great day!',
      end: true,
    },
  ];
  
  
  // Define chatbot theme
  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Arial, Helvetica, sans-serif',
    headerBgColor: '#ff5c5c',
    headerFontColor: '#fff',
    headerFontSize: '18px',
    botBubbleColor: '#ff5c5c',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  return (
    <div className="Main">
      <img src={forestImage} alt="Forest background" className="Main-background" />
      <div className="Main-content">
        <img src={anndaata} alt="Anndaata Logo" className="logo" />
        <h1>Anndaata</h1>
        <p>Connecting Farmers & Cultivating Futures</p>
      </div>
      <button className="chat-btn" onClick={() => setShowChat(!showChat)}>
        {showChat ? 'Close Chat' : "Let's Chat!"}
      </button>

      {showChat && (
        <ThemeProvider theme={theme}>
          <ChatBot steps={chatbotSteps} floating={false} />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Main;