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
  margin: 0 auto;
  
  font-family: Arial, sans-serif;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
`;

const Heading = styled.h2`
  color: #fff;
  margin-bottom: 20px;
`;

const SubHeading = styled.h3`
  color: #ddd;
  margin-bottom: 15px;
`;

const InputSection = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #ddd;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #4A1F1A; /* Dark Wine Red */
  border-radius: 8px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent input background */
  margin-right: 20px;
`;

const Input = styled.input`
  width: 80%;
  max-width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #4A1F1A; /* Dark Wine Red */
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent input background */
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
`;

const LoadingSection = styled.div`
  margin-top: 20px;
`;

const LoadingText = styled.p`
  color: #fff;
  font-size: 18px;
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

const AnswerSection = styled.div`
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AnswerHeading = styled.h3`
  color: #333;
  margin-bottom: 10px;
`;

const AnswerText = styled.div`
  font-size: 16px;
  color: #555;
  text-align: left; /* Left-align the answer text */
`;

const QnASection = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [candidate1, setCandidate1] = useState('');
  const [candidate2, setCandidate2] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleCandidate1Change = (event) => {
    setCandidate1(event.target.value);
  };

  const handleCandidate2Change = (event) => {
    setCandidate2(event.target.value);
  };

  const generateAnswer = async () => {
    if (!question || !candidate1 || !candidate2) {
      alert("Please type a question and select both candidates.");
      return;
    }

    setLoading(true);
    setAnswer('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/get_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, candidate1, candidate2 }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAnswer(formatAnswer(data.answer));
    } catch (error) {
      console.error('Error fetching the answer:', error);
      setAnswer('There was an error fetching the answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatAnswer = (answer) => {
    const sections = answer.split('\n\n');
  
    return sections.map((section, index) => {
      if (section.startsWith('*')) {
        const items = section.split('\n').filter(item => item.trim());
        return (
          <div key={index} style={{ marginBottom: '10px' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', textAlign: 'left' }}>
              {items.map((item, idx) => {
                const formattedItem = item.replace(/^\* /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Remove leading * and format bold text
                return (
                  <li key={idx} style={{ color: '#555' }} dangerouslySetInnerHTML={{ __html: formattedItem }} />
                );
              })}
            </ul>
          </div>
        );
      }
  
      const formattedSection = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Format bold text in sections
      return (
        <div key={index} style={{ marginBottom: '10px', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: formattedSection }} />
      );
    });
  };

  return (
    <Container>
      <Heading>Manifesto Comparator</Heading>
      <SubHeading>Compare manifestos of candidates</SubHeading> {/* Added this heading */}
      <InputSection>
        <Label htmlFor="candidate1">Candidate 1:</Label>
        <Select id="candidate1" value={candidate1} onChange={handleCandidate1Change}>
          <option value="" disabled>Select a candidate</option> {/* Placeholder */}
          <option value="candidate1">Anura Dissanayake</option>
          <option value="candidate2">Sajith Premadasa</option>
          <option value="candidate3">Ranil Wickremasinghe</option>
        </Select>
        <Label htmlFor="candidate2">Candidate 2:</Label>
        <Select id="candidate2" value={candidate2} onChange={handleCandidate2Change}>
          <option value="" disabled>Select a candidate</option> {/* Placeholder */}
          <option value="candidate1">Anura Dissanayake</option>
          <option value="candidate2">Sajith Premadasa</option>
          <option value="candidate3">Ranil Wickremasinghe</option>
        </Select>
      </InputSection>
      <InputSection>
        <Label htmlFor="question">Ask your question:</Label>
        <Input
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Type your question here"
        />
      </InputSection>
      <Button onClick={generateAnswer}>Get Answer</Button>
      {loading && (
        <LoadingSection>
          <LoadingText>Generating Answer...</LoadingText>
          <Loader />
        </LoadingSection>
      )}
      {answer && (
        <AnswerSection>
          <AnswerHeading>Answer:</AnswerHeading>
          <AnswerText>{answer}</AnswerText>
        </AnswerSection>
      )}
    </Container>
  );
};

export default QnASection;
