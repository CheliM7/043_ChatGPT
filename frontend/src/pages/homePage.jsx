import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ThreeSectionContainer from '../components/threeSectionContainer';
import HorizontalBarChart from '../components/homePage/HorizontalBarChart';
import ApexChart from '../components/homePage/apexchart';
import WinPredictionDisplay from '../components/homePage/WinPredictionDisplay';
import Chatbot from '../components/chatbot'; // Import the Chatbot component

const HomePage = () => {
  const [isBouncing, setIsBouncing] = useState(true);

  const handleChatbotClick = () => {
    setIsBouncing(false);
    // Add any additional logic for opening the chatbot
  };

  useEffect(() => {
    setIsBouncing(true); // Ensure the chatbot bounces on mount
  }, []);

  return (
    <HomePageContainer>
      <MainContent>
        <Button href="https://elections.gov.lk/" target="_blank" rel="noopener noreferrer">
          Visit the Election Commission Website
        </Button>
        <ThreeSectionContainer />
        <ChartWrapper>
          <ChartContainer>
            <ApexChart />
            <WinPredictionDisplay />
          </ChartContainer>
          <ApexChartDescription>
            This is the current win prediction for each candidate. Factors link live sentiment score, Public and built-in polls counts are taken into account.
          </ApexChartDescription>
        </ChartWrapper>
        <TextDescription>
          This graph provides a real-time overview of public sentiment regarding the election, showcasing a positivity score derived from various sources such as news outlets, blogs, and social media platforms.
          <Highlight>The sentiment score gets updated in real time</Highlight>, reflecting the current mood and opinions of people across different channels. It offers valuable insights into election trends by gauging public perception in real time, helping you stay informed about the shifts in sentiment as they happen.
        </TextDescription>
        <HorizontalBarChart />
      </MainContent>
      <ChatbotWrapper isBouncing={isBouncing} onClick={handleChatbotClick}>
        <Chatbot /> {/* Add the Chatbot component inside a wrapper */}
      </ChatbotWrapper>
    </HomePageContainer>
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

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Removed background color */
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
`;

const Button = styled.a`
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #7a0000;
  background-color: rgba(0, 123, 255, 0.5);
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  position: absolute;
  right: 20px;
  top: 110px;

  &:hover {
    background-color: rgba(0, 86, 179, 0.5);
  }

  &:active {
    background-color: rgba(0, 64, 133, 0.5);
    transform: scale(0.98);
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  animation: bounce 2.5s infinite;
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

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  height: auto; 
`;

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ApexChartDescription = styled.p`
  font-size: 12px;
  color: #666;
  margin: 10px 0;
  text-align: center; 
  width: 100%;
  max-width: 500px; /* Adjust as needed */
`;

const TextDescription = styled.p`
  margin: 30px 120px; 
  font-size: 20px; 
  color: #333;
  text-align: left; 
`;

const Highlight = styled.span`
  background-color: yellow; /* Highlight color */
  font-weight: bold; /* Optional: make the text bold */
`;

export default HomePage;