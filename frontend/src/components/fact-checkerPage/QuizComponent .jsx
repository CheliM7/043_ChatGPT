import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: #333;
  font-family: 'Poppins', sans-serif;
`;

const StartQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  padding: 12px;
  margin: 15px 0;
  width: 100%;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #333;
`;

const StartButton = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px; // Increase this value as needed
  width: 100%;
`;


const Question = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const AnswerLabel = styled.label`
  background-color: ${(props) => (props.selected ? '#4caf50' : '#e0f7fa')};
  padding: 10px;
  font-size: 18px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  color: ${(props) => (props.selected ? 'white' : '#333')};
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-height: 50px; // Ensure same size

  &:hover {
    background-color: ${(props) => (props.selected ? '#388e3c' : '#b2ebf2')};
  }
`;

const Explanation = styled.p`
  margin-top: 20px;
  font-style: italic;
  color: ${(props) => (props.isCorrect ? '#4caf50' : '#f44336')};
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const NextButton = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 48%; // Adjust the width to fit side by side

  &:hover {
    background-color: #0056b3;
  }
`;

const CheckAnswerButton = styled.button`
  padding: 12px 20px;
  background-color: #ff9800;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 48%; // Adjust the width to fit side by side

  &:hover {
    background-color: #e68a00;
  }
`;

const LoadingIndicator = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const CloseButton = styled.button`
  padding: 10px 15px;
  background-color: #f44336;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const QuizComponent = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [correctAnswerText, setCorrectAnswerText] = useState(''); // Store correct answer text
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Start the quiz
  const startQuiz = async () => {
    if (!topic) {
      setExplanation('Please enter a topic');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      setQuizStarted(true);
      fetchQuestion();
    } catch (error) {
      setExplanation('Failed to start quiz');
    }
  };

  // Fetch a new question
  const fetchQuestion = async () => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await fetch('http://localhost:5000/api/quiz/get_question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      // Update state with the data from API response
      setQuestion(data.question);
      setAnswers(data.answers);
      setCorrectAnswer(data.correct_answer);
      setExplanation('');
      setSelectedAnswer(null);
    } catch (error) {
      setExplanation('Failed to fetch question');
    } finally {
      setIsLoading(false); // Set loading to false after fetch
    }
  };

  // Check the selected answer
  const checkAnswer = (index) => {
    setSelectedAnswer(index);
    const isCorrect = index + 1 === correctAnswer;
    const message = isCorrect ? 'Correct Answer!' : 'Incorrect. Try again.';
    setExplanation(message);
  };

  // Show correct answer in a modal
  const showCorrectAnswer = () => {
    setCorrectAnswerText(answers[correctAnswer - 1]); // Store the correct answer
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <QuizContainer>
      {!quizStarted ? (
        <StartQuizContainer>
          <h2>Start a Quiz</h2>
          <Input
            type="text"
            placeholder="Enter a topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <StartButton onClick={startQuiz}>Start Quiz</StartButton>
          {explanation && <p>{explanation}</p>}
        </StartQuizContainer>
      ) : (
        <QuizContent>
          {isLoading ? (
            <LoadingIndicator>Loading next question...</LoadingIndicator>
          ) : (
            <>
              <Question>{question}</Question>
              <AnswerContainer>
                {answers.map((answer, index) => (
                  <AnswerLabel
                    key={index}
                    selected={selectedAnswer === index}
                    onClick={() => checkAnswer(index)}
                  >
                    {answer}
                  </AnswerLabel>
                ))}
              </AnswerContainer>
              {explanation && <Explanation isCorrect={selectedAnswer + 1 === correctAnswer}>{explanation}</Explanation>}
              <ButtonContainer>
                <CheckAnswerButton onClick={() => showCorrectAnswer()}>Show Correct Answer</CheckAnswerButton>
                <NextButton onClick={fetchQuestion}>Next Question</NextButton>
              </ButtonContainer>
            </>
          )}
        </QuizContent>
      )}
      {isModalOpen && (
        <ModalBackground>
          <ModalContent>
            <h3>Correct Answer:</h3>
            <p>{correctAnswerText}</p>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ModalContent>
        </ModalBackground>
      )}
    </QuizContainer>
  );
};

export default QuizComponent;
