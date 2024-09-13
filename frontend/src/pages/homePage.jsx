import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <HomePageContainer>
      <MainContent>
        {/* <h1>Welcome to SL ELECTIONS 2024</h1>
        <p>Stay updated with the latest election news and updates.</p> */}
        <Button href="https://elections.gov.lk/" target="_blank" rel="noopener noreferrer">
          Visit the Election Commission Website
        </Button>
      </MainContent>
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f8ff; /* Light blue background */
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  text-align: center;
`;

const Button = styled.a`
  display: inline-block;
  padding: 15px 30px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff; /* Blue color */
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3; /* Darker blue */
  }

  &:active {
    background-color: #004085; /* Even darker blue */
    transform: scale(0.98);
  }

  /* Keyframes for up and down movement */
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

  animation: bounce 2s infinite;
`;

export default HomePage;
