import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
  color: #333;
  font-family: 'Roboto', sans-serif;
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
  max-width: 600px;
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
`;

const AnswerLabel = styled.label`
  background-color: ${(props) => (props.selected ? '#4caf50' : '#e0f7fa')};
  padding: 10px;
  font-size: 18px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: ${(props) => (props.selected ? 'white' : '#333')};
  cursor: pointer;
  transition: background-color 0.3s ease;

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

const QuizComponent = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);

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
    }
  };

  // Check the selected answer
  const checkAnswer = (index) => {
    setSelectedAnswer(index);
    const isCorrect = index + 1 === correctAnswer;
    const message = isCorrect ? 'Correct Answer!' : 'Incorrect. Try again.';
    setExplanation(message);

    if (isCorrect) {
      setTimeout(() => {
        fetchQuestion();
      }, 3000);
    }
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
          <Question>{question}</Question>
          <AnswerContainer>
            {answers.length > 0 ? (
              answers.map((answer, index) => (
                <AnswerLabel
                  key={index}
                  selected={selectedAnswer === index}
                  onClick={() => checkAnswer(index)}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => checkAnswer(index)}
                    style={{ marginRight: '10px' }}
                  />
                  {answer}
                </AnswerLabel>
              ))
            ) : (
              <p>Loading answers...</p>
            )}
          </AnswerContainer>
          {explanation && (
            <Explanation isCorrect={selectedAnswer + 1 === correctAnswer}>
              {explanation}
            </Explanation>
          )}
        </QuizContent>
      )}
    </QuizContainer>
  );
};

export default QuizComponent;
