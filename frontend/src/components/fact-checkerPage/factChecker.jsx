import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  padding: 30px;
  max-width: 700px;
  margin: 20px auto; /* Added margin for small devices */
  
  font-family: Arial, sans-serif;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Heading = styled.h2`
  color: #fff;
  margin-bottom: 20px;
  font-size: 24px; /* Larger text for larger screens */

  @media (max-width: 600px) {
    font-size: 20px; /* Slightly smaller on small devices */
  }
`;

const InputSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 10px;
  text-align: center; /* Center align the label text */
  width: 100%; /* Full width to align with input */
`;

const Input = styled.input`
  width: 80%; /* Width of input field */
  max-width: 400px; /* Limit max width for larger screens */
  padding: 12px;
  font-size: 16px;
  border: 2px solid #4A1F1A; /* Dark Wine Red */
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent input background */

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px; /* Slightly smaller font on small devices */
    width: 90%; /* Increase width on smaller screens */
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  background-color: #4A1F1A; /* Dark Wine Red */
  color: #F4C300; /* Sri Lankan Flag Yellow */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #70281e; /* Darker Wine Red on hover */
  }

  @media (max-width: 600px) {
    padding: 10px 15px; /* Adjust button padding for small screens */
    font-size: 16px; /* Slightly smaller font on small devices */
  }
`;

const LoadingSection = styled.div`
  margin-top: 20px;
`;

const LoadingText = styled.p`
  color: #fff;
  font-size: 18px;

  @media (max-width: 600px) {
    font-size: 16px; /* Slightly smaller font on small devices */
  }
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #F4C300; /* Sri Lankan Flag Yellow */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite; /* Spinner animation */
  margin: 0 auto;
`;

const ResultSection = styled.div`
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    padding: 15px; /* Adjust padding for small screens */
  }
`;

const ResultHeading = styled.h3`
  color: #333;
  margin-bottom: 10px;
  font-size: 20px;

  @media (max-width: 600px) {
    font-size: 18px; /* Adjust font size for small screens */
  }
`;

const FactText = styled.div`
  font-size: 16px;
  color: #555;
  text-align: left; /* Left-align the fact text */
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 14px; /* Smaller font for small devices */
  }
`;

const ResultText = styled.div`
  font-size: 16px;
  color: ${(props) => (props.isTrue ? 'green' : 'red')}; /* Set color based on truth value */
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 14px; /* Smaller font for small devices */
  }
`;

const FactChecker = () => {
  const [fact, setFact] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(false); // New state to track if the fact is true or false

  const handleFactChange = (event) => {
    setFact(event.target.value);
  };

  const checkFact = async () => {
    if (!fact) {
      alert('Please enter a fact to check.');
      return;
    }

    setLoading(true);
    setResult('');
    setIsTrue(false); // Reset isTrue state before checking

    try {
      // Simulate fact-checking delay
      setTimeout(() => {
        // Assume the fact-checking logic (here, just a simple check for demonstration)
        const isFactTrue = Math.random() >= 0.5; // Randomly determine true or false for demo
        setResult(fact);
        setIsTrue(isFactTrue);
        setLoading(false);
      }, 2000); // 2 second delay for demo purposes
    } catch (error) {
      setResult('Error occurred while checking the fact. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Heading>Fact Checker</Heading>
      <InputSection>
        <Label htmlFor="fact">Enter a fact to check:</Label>
        <Input
          type="text"
          id="fact"
          value={fact}
          onChange={handleFactChange}
          placeholder="Type your fact here"
        />
      </InputSection>
      <Button onClick={checkFact}>Check</Button>

      {loading && (
        <LoadingSection>
          <LoadingText>Checking Fact...</LoadingText>
          <Loader />
        </LoadingSection>
      )}

      {result && (
        <ResultSection>
          <ResultHeading>Result:</ResultHeading>
          <FactText>{`Fact: "${result}"`}</FactText>
          <ResultText isTrue={isTrue}>{isTrue ? 'True' : 'False'}</ResultText>
        </ResultSection>
      )}
    </Container>
  );
};

export default FactChecker;
