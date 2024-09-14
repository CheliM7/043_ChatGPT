// PublicPolls.jsx
import React from 'react';
import styled from 'styled-components';

const PollsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: #00000;
`;

const PollTile = styled.div`
  width: 80%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const PollTitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const PollDetails = styled.p`
  font-size: 16px;
  color: #666;
`;

const Button = styled.button`
  background: #007bff;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
  }
`;

const PublicPolls = () => {
  // Sample public polls data
  const polls = [
    { title: 'Poll 1: Favorite programming language?', details: 'Vote for your favorite programming language in the tech community.' },
    { title: 'Poll 2: Best movie of 2024?', details: 'Which movie released in 2024 did you enjoy the most?' },
    { title: 'Poll 3: Most anticipated tech gadget?', details: 'What tech gadget are you looking forward to the most?' }
  ];

  return (
    <PollsContainer>
      {polls.map((poll, index) => (
        <PollTile key={index}>
          <div>
            <PollTitle>{poll.title}</PollTitle>
            <PollDetails>{poll.details}</PollDetails>
          </div>
          <Button>View Poll</Button>
        </PollTile>
      ))}
    </PollsContainer>
  );
};

export default PublicPolls;
