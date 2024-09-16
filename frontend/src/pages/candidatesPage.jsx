import React, { useState, useEffect } from 'react';
import CandidateTable from '../components/candidates';
import styled, { keyframes, css } from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Chatbot from '../components/chatbot';
const NAVBAR_HEIGHT = '120px';  

const Button = styled.a`
  position: fixed;
  top: calc(${NAVBAR_HEIGHT} + 20px); /* Space from the top of the viewport plus a margin */
  left: 40px;
  width: 40px; /* Width of the circle */
  height: 40px; /* Height of the circle */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent; /* Transparent background */
  color: #4A1F1A; /* Icon color */
  border: 2px solid #4A1F1A; /* Border color */
  border-radius: 50%; /* Circle shape */
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #4A1F1A; /* Button background color on hover */
    color: #fff; /* Icon color on hover */
    border-color: #4A1F1A; /* Border color on hover */
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`;

const CandidatesPage = () => {
  const [isBouncing, setIsBouncing] = useState(true);

  const handleChatbotClick = () => {
    setIsBouncing(false);
    // Add any additional logic for opening the chatbot
  };

  useEffect(() => {
    setIsBouncing(true); // Ensure the chatbot bounces on mount
  }, []);

  return (
    <div>
      <Button href="/home" title="Go to Home">
        <ArrowBackIcon />
      </Button>
      <CandidateTable />
      <ChatbotWrapper isBouncing={isBouncing} onClick={handleChatbotClick}>
        <Chatbot /> {/* Add the Chatbot component inside a wrapper */}
      </ChatbotWrapper>
    </div>
  );
};

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* Ensure the chatbot is on top */
  ${props => props.isBouncing && css`
    animation: ${bounce} 2.5s infinite;
  `}
  cursor: pointer;
`;

export default CandidatesPage;
