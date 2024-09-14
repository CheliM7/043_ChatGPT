import React, { useState } from 'react';
import CandidateTile from '../components/votingPage/CandidateTile';
import GraphComponent from '../components/votingPage/GraphComponent';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const TilesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const VotingPage = () => {
  const [voteSuccessful, setVoteSuccessful] = useState(false);

  const handleVote = () => {
    console.log("Vote button clicked"); // Log when button is clicked
    setVoteSuccessful(true);
  };

  // Sample candidates data
  const candidates = [
    { name: 'Sajith Premadasa', image: 'path/to/image1.jpg' },
    { name: 'Anura Kumara Dissanayake', image: 'path/to/image2.jpg' },
    { name: 'Ranil Wickramasinghe', image: 'path/to/image3.jpg' },
    { name: 'Other', image: 'path/to/image3.jpg' }
  ];

  return (
    <Container>
      <Heading>
        {voteSuccessful ? 'Current voting Results' : 'If you had the chance to vote now, who would you vote for?'}
      </Heading>
      {!voteSuccessful && (
        <TilesContainer>
          {candidates.map((candidate, index) => (
            <CandidateTile
              key={index}
              name={candidate.name}
              image={candidate.image}
              onVote={handleVote} // Ensure this is passed correctly
            />
          ))}
        </TilesContainer>
      )}
      {voteSuccessful && <GraphComponent />} {/* Render graph component conditionally */}
    </Container>
  );
};

export default VotingPage;
