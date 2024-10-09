import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  padding: 30px;
  max-width: 90%;  
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #2E2E2E;  /* Darker gray for better contrast */
  
  @media (min-width: 768px) {
    max-width: 700px; 
  }
`;

const Heading = styled.h2`
  color: #fff;
  margin-bottom: 20px;
  font-size: 24px;
  text-decoration: underline;  /* Add underline */
  
  @media (min-width: 768px) {
    font-size: 28px; /* Larger font on medium screens */
  }
`;

const SubHeading = styled.h3`
  color: #ddd;
  margin-bottom: 10px;
`;

const InputSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column; /* Stack inputs vertically on small screens */

  @media (min-width: 768px) {
    flex-direction: row; /* Row layout for larger screens */
    justify-content: center;
    align-items: center;
  }
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-right: 10px;  /* Space between label and input on large screens */
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #4A1F1A;
  border-radius: 8px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;

  @media (min-width: 768px) {
    margin-right: 20px; /* Adjusted for spacing on larger screens */
    margin-bottom: 0; /* Remove margin-bottom in row layout */
  }
`;

const Input = styled.input`
  width: 100%;  /* Full width for mobile */
  max-width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #4A1F1A;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.8);
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 18px;
  background-color: #4A1F1A;
  color: #F4C300;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 20px; /* Added margin for better spacing */

  &:hover {
    background-color: #722a1e;  /* Slight color change on hover */
  }

  @media (min-width: 768px) {
    margin-top: 0; /* Remove extra margin on larger screens */
  }
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
  border-top: 4px solid #F4C300;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

const AnswerSection = styled.div`
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.9);
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
  text-align: left;
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
      // Ensure the question includes a comparison between the two candidates
      const modifiedQuestion = `Compare ${candidate1} and ${candidate2} on ${question}.`;
  
      const response = await fetch('http://127.0.0.1:5000/api/get_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: modifiedQuestion, candidate1, candidate2 }),
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
                const formattedItem = item.replace(/^\* /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return (
                  <li key={idx} style={{ color: '#555' }} dangerouslySetInnerHTML={{ __html: formattedItem }} />
                );
              })}
            </ul>
          </div>
        );
      }

      const formattedSection = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <div key={index} style={{ marginBottom: '10px', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: formattedSection }} />
      );
    });
  };

  return (
    <Container>
      <Heading>Manifesto Comparator</Heading>
      <SubHeading>Compare manifestos of candidates</SubHeading>
      <InputSection>
        <Label htmlFor="candidate1">Candidate 1:</Label>
        <Select id="candidate1" value={candidate1} onChange={handleCandidate1Change}>
          <option value="" disabled>Select a candidate</option>
          <option value="Anura Dissanayake">Anura Dissanayake</option>
          <option value="Sajith Premadasa">Sajith Premadasa</option>
          <option value="Ranil Wickremasinghe">Ranil Wickremasinghe</option>
        </Select>
        <Label htmlFor="candidate2">Candidate 2:</Label>
        <Select id="candidate2" value={candidate2} onChange={handleCandidate2Change}>
          <option value="" disabled>Select a candidate</option>
          <option value="Anura Dissanayake">Anura Dissanayake</option>
          <option value="Sajith Premadasa">Sajith Premadasa</option>
          <option value="Ranil Wickremasinghe">Ranil Wickremasinghe</option>
        </Select>
      </InputSection>
      <Input
        type="text"
        placeholder="Enter your question here"
        value={question}
        onChange={handleQuestionChange}
      />
      <Button onClick={generateAnswer}>Compare Manifestos</Button>

      {loading && (
        <LoadingSection>
          <Loader />
          <LoadingText>Loading...</LoadingText>
        </LoadingSection>
      )}

      {answer && (
        <AnswerSection>
          <AnswerHeading>Comparison Results:</AnswerHeading>
          <AnswerText>{answer}</AnswerText>
        </AnswerSection>
      )}
    </Container>
  );
};

export default QnASection;
