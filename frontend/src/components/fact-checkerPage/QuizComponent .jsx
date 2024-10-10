import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

// Styled components
const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  font-family: 'Roboto', sans-serif;
`;

const StartQuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #223a5f;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  margin: 15px 0;
  width: 100%;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  color: #333;
`;

const StartButton = styled.button`
  padding: 12px 20px;
  background-color: #00c9ff;
  background-image: linear-gradient(45deg, #00c9ff, #92fe9d);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-image: linear-gradient(45deg, #92fe9d, #00c9ff);
  }
`;

const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #223a5f;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  max-width: 600px;
  width: 100%;
`;

const Question = styled.h3`
  font-size: 22px;
  margin-bottom: 20px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AnswerLabel = styled.label`
  background-color: ${(props) => (props.selected ? '#00c9ff' : '#1e90ff')};
  padding: 10px;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? '#00a9d4' : '#007acc')};
  }
`;

const Explanation = styled.p`
  margin-top: 20px;
  font-style: italic;
  color: ${(props) => (props.isCorrect ? 'lightgreen' : 'tomato')};
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

  // Start the quiz by sending topic to the backend
  const startQuiz = async () => {
    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();
      toast.success(data.message);
      setQuizStarted(true);
      fetchQuestion();
    } catch (error) {
      console.error('Error starting quiz:', error);
      toast.error('Failed to start quiz');
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
      setQuestion(data.question); // Set the question text
      setAnswers(data.answers); // Set the possible answers
      setCorrectAnswer(data.correct_answer); // Set the correct answer index
      setExplanation(''); // Reset explanation
      setSelectedAnswer(null); // Reset selected answer
    } catch (error) {
      console.error('Error fetching question:', error);
      toast.error('Failed to fetch question');
    }
  };

  // Check the selected answer
  const checkAnswer = (index) => {
    setSelectedAnswer(index);
    const isCorrect = index + 1 === correctAnswer;
    const message = isCorrect ? 'Correct Answer!' : 'Incorrect. Try again.';
    setExplanation(message);
    toast.info(message);

    if (isCorrect) {
      setTimeout(() => {
        fetchQuestion(); // Fetch the next question after a delay
      }, 3000); // 3 seconds delay to show the explanation
    }
  };

  return (
    <QuizContainer>
      <ToastContainer />
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
