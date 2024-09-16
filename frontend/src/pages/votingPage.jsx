import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CandidateTile from '../components/votingPage/CandidateTile';
import GraphComponent from '../components/votingPage/GraphComponent';
import PublicPolls from '../components/votingPage/PublicPolls'; // Import the PublicPolls component
import AKD from '../assets/AKD.jpg';
import SP from '../assets/SP.jpeg';
import RW from '../assets/RW_2.jpeg';
import Other from '../assets/other.jpeg';
import Chatbot from '../components/chatbot'; // Import the Chatbot component

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const TilesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const VotingPage = () => {
  const [voteSuccessful, setVoteSuccessful] = useState(false);
  const [isBouncing, setIsBouncing] = useState(true); // State for chatbot bouncing animation

  const handleVote = () => {
    console.log("Vote button clicked"); // Log when button is clicked
    setVoteSuccessful(true);
  };

  // Sample candidates data
  const candidates = [
    { name: 'Sajith Premadasa', image: SP },
    { name: 'Anura Kumara Dissanayake', image: AKD },
    { name: 'Ranil Wickramasinghe', image: RW },
    { name: 'Other', image: Other }
  ];

  // Handle chatbot click to stop bouncing
  const handleChatbotClick = () => {
    setIsBouncing(false);
    // Add any additional logic for opening the chatbot
  };

  // Ensure the chatbot bounces on mount
  useEffect(() => {
    setIsBouncing(true);
  }, []);

  return (
    <>
      <Button href="/home" title="Go to Home">
        <ArrowBackIcon />
      </Button>
      <Container>
        <Heading>
          {voteSuccessful ? 'Current voting Results' : 'If you had the chance to vote now, who would you vote for?'}
        </Heading>
        {!voteSuccessful && (
          <TilesContainer>
            {candidates.map((candidate, index) => (
              <CandidateTile
                key={index}
                name={candidate.name}
                image={candidate.image}
                onVote={handleVote} 
              />
            ))}
          </TilesContainer>
        )}
        {voteSuccessful && (
          <>
            <GraphComponent /> {/* Render graph component */}
            <PublicPolls /> {/* Render public polls component below the graph */}
          </>
        )}
      </Container>
      <ChatbotWrapper isBouncing={isBouncing} onClick={handleChatbotClick}>
        <Chatbot /> {/* Add the Chatbot component inside a wrapper */}
      </ChatbotWrapper>
    </>
  );
};

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* Ensure the chatbot is on top */
  ${props => props.isBouncing && `
    animation: bounce 2.5s infinite;
  `}
  cursor: pointer;
`;

export default VotingPage;
