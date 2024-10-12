import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import factImage from '../../assets/sl.png';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  padding: 30px;
  max-width: 700px;
  margin: 20px auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Heading = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Image = styled.img`
  height: 200px;
  margin-bottom: 0px;
  border-radius: 10px;
`;

const InputSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #555;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;

const Input = styled.input`
  width: 80%;
  max-width: 400px;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #c0c0c0;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  background-color: #fff;

  &:focus {
    border-color: #00b4d8;
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
    width: 90%;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  background-color: #4A1F1A;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #0077b6;
  }

  @media (max-width: 600px) {
    padding: 10px 15px;
    font-size: 16px;
  }
`;

const LoadingSection = styled.div`
  margin-top: 20px;
`;

const LoadingText = styled.p`
  color: #555;
  font-size: 18px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #00b4d8;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

const AnswerDisplay = ({ fact, isTrue, unknown }) => {
  const randomStyles = {
    backgroundColor: unknown ? '#fff3cd' : isTrue ? '#d4edda' : '#f8d7da',
    color: unknown ? '#856404' : isTrue ? '#155724' : '#721c24',
    border: unknown ? '2px solid #ffeeba' : isTrue ? '2px solid #c3e6cb' : '2px solid #f5c6cb',
    padding: '15px',
    borderRadius: '10px',
    marginTop: '20px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={randomStyles}>
      {unknown ? (
        <h3>Fact is Unknown</h3>
      ) : (
        <h3>{isTrue ? 'Fact is True' : 'Fact is False'}</h3>
      )}
      <p>{`Fact: "${fact}"`}</p>
    </div>
  );
};

const FactChecker = ({ onFalseOrUnknown }) => {
  const [fact, setFact] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [unknown, setUnknown] = useState(false);

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
    setIsTrue(false);
    setUnknown(false);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/factCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: fact }),
      });

      const data = await response.json();

      if (response.ok) {
        const answer = data.answer.trim(); // Trim the newline character
        setResult(fact);
        console.log('Fact checked:', data);
        
        if (answer === 'True') {
          setIsTrue(true);
        } else if (answer === 'False') {
          setIsTrue(false);
          onFalseOrUnknown(); // Trigger callback for False or Unknown
        } else {
          setUnknown(true);
          onFalseOrUnknown(); // Trigger callback for False or Unknown
        }
      } else {
        setResult('Error occurred while checking the fact. Please try again.');
      }
    } catch (error) {
      console.error('Error checking the fact:', error);
      setResult('Error occurred while checking the fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Image src={factImage} alt="Fact Checking" />
      <Heading>We Value Truth</Heading>
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

      {result && <AnswerDisplay fact={result} isTrue={isTrue} unknown={unknown} />}
    </Container>
  );
};

export default FactChecker;
