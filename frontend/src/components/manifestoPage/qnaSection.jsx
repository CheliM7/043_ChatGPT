
import React, { useState } from 'react';

const QnASection = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const generateAnswer = () => {
    // You can customize this logic to generate an actual answer, e.g., calling an API
    setAnswer(`This is the answer to your question: "${question}"`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Q&A Generator</h2>
      <div style={styles.inputSection}>
        <label htmlFor="question" style={styles.label}>Ask your question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
          style={styles.input}
          placeholder="Type your question here"
        />
      </div>
      <button onClick={generateAnswer} style={styles.button}>
        Get Answer
      </button>
      {answer && (
        <div style={styles.answerSection}>
          <h3 style={styles.answerHeading}>Answer:</h3>
          <p style={styles.answerText}>{answer}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '700px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  heading: {
    color: '#fff',
    marginBottom: '20px',
  },
  inputSection: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#ddd',
  },
  input: {
    width: '80%',
    maxWidth: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '2px solid #4A1F1A', // Dark Wine Red
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent input background
  },
  button: {
    padding: '12px 25px',
    fontSize: '18px',
    backgroundColor: '#4A1F1A', // Dark Wine Red
    color: '#F4C300', // Sri Lankan Flag Yellow
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#3A0E0A', // Darker shade of Dark Wine Red
  },
  answerSection: {
    marginTop: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  answerHeading: {
    color: '#333',
    marginBottom: '10px',
  },
  answerText: {
    fontSize: '16px',
    color: '#555',
  },
};

export default QnASection;