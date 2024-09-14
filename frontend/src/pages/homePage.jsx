import React from 'react';
import styled from 'styled-components';
import ThreeSectionContainer from '../components/threeSectionContainer';

const HomePage = () => {
  return (
    <HomePageContainer>
      <MainContent>
        {/* <h1>Welcome to SL ELECTIONS 2024</h1>
        <p>Stay updated with the latest election news and updates.</p> */}
        <Button href="https://elections.gov.lk/" target="_blank" rel="noopener noreferrer">
          Visit the Election Commission Website
        </Button>
        <ThreeSectionContainer />
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
  padding: 10px 20px; /* Reduced padding for smaller size */
  margin: 0;
  font-size: 14px; /* Slightly smaller font size */
  font-weight: bold;
  color: #ffffff;
  background-color: rgba(0, 123, 255, 0.5); /* Blue color with transparency */
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  position: absolute; /* Positioning for top right placement */
  right: 20px; /* Distance from the right edge */
  top: 110px; /* Distance from the top edge */

  &:hover {
    background-color: rgba(0, 86, 179, 0.5); /* Darker blue with transparency */
  }

  &:active {
    background-color: rgba(0, 64, 133, 0.5); /* Even darker blue with transparency */
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

  animation: bounce 2.5s infinite;
`;

export default HomePage;
