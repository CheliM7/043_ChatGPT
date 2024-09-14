import React, { useState } from 'react';
import CandidateTile from '../components/votingPage/CandidateTile';
import GraphComponent from '../components/votingPage/GraphComponent';
import PublicPolls from '../components/votingPage/PublicPolls'; // Import the PublicPolls component
import styled from 'styled-components';
import AKD from '../assets/AKD.jpg';
import SP from '../assets/SP.jpeg';
import RW from '../assets/RW_2.jpeg';
import Other from '../assets/other.jpeg';

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
    { name: 'Sajith Premadasa', image: SP },
    { name: 'Anura Kumara Dissanayake', image: AKD },
    { name: 'Ranil Wickramasinghe', image: RW },
    { name: 'Other', image: Other }
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
              onVote={handleVote} 
            />
          ))}
        </TilesContainer>
      )}
      {voteSuccessful && (
        <>
          <GraphComponent /> {/* Render graph component */}
          <PublicPolls /> {/* Render public polls component below the graph */}
        </>
      )}
    </Container>
  );
};

export default VotingPage;
