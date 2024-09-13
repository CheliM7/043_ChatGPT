import React from 'react';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <HomePageContainer>
      <MainContent>
        <h1>Welcome to SL ELECTIONS 2024</h1>
        <p>Stay updated with the latest election news and updates.</p>
        {/* Add more content here as needed */}
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

export default HomePage;
