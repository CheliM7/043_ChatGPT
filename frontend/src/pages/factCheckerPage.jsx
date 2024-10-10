import React, { useState } from 'react';
import styled from 'styled-components';
import FactChecker from '../components/fact-checkerPage/factChecker';
import QuizComponent from '../components/fact-checkerPage/QuizComponent ';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`;

const PopupHeading = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const PopupMessage = styled.p`
  color: #666;
`;

const ButtonContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545; /* Red color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #c82333; /* Darker red on hover */
  }
`;

const VerifyButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745; /* Green color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }
`;

const Heading = styled.h2`
  margin: 40px 0 20px; /* Increased top margin */
  text-align: center;
  color: #1e90ff; /* Bright color for a modern look */
  font-size: 24px; /* Larger font size */
  font-weight: bold; /* Bold text */
  text-transform: uppercase; /* Uppercase letters for emphasis */
  letter-spacing: 1.2px; /* Slightly increased letter spacing */
  font-family: 'Arial', sans-serif; /* Modern sans-serif font */
  border-bottom: 2px solid #1e90ff; /* Bottom border for emphasis */
  padding-bottom: 10px; /* Padding below the text */
`;


const FactCheckerPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleFalseOrUnknown = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleVerify = () => {
    // Logic for verifying can be added here (e.g., redirect to a credible source or show more info)
    alert('Redirecting to verification source...');
  };

  return (
    <Wrapper>
      <FactChecker onFalseOrUnknown={handleFalseOrUnknown} />

      {showPopup && (
        <PopupOverlay>
          <PopupCard>
            <PopupHeading>Fact Verification</PopupHeading>
            <PopupMessage>
              The fact you entered is either False or Unknown. Please verify the information from credible sources.
            </PopupMessage>
            <ButtonContainer>
              <CloseButton onClick={handleClosePopup}>Close</CloseButton>
              <VerifyButton onClick={handleVerify}>Verify</VerifyButton>
            </ButtonContainer>
          </PopupCard>
        </PopupOverlay>
      )}

      <Heading>How educated are you about Politics in Sri Lanka? Try the following quiz</Heading>
      <QuizComponent />
    </Wrapper>
  );
};

export default FactCheckerPage;
