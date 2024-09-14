// VotingPage.jsx
import React from 'react';
import CandidateTile from '../components/votingPage/CandidateTile';
import PublicPolls from '../components/votingPage/PublicPolls';
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

const SubHeading = styled.h2`
  font-size: 20px;
  margin: 20px 0;
  color: #555;
`;

const TilesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const VotingPage = () => {
  // Sample candidates data
  const candidates = [
    { name: 'Sajith Premadasa', image: 'path/to/image1.jpg' },
    { name: 'Anura Kumara Dissanayake', image: 'path/to/image2.jpg' },
    { name: 'Ranil Wickramasinghe', image: 'path/to/image3.jpg' },
    { name: 'Other', image: 'path/to/image3.jpg' }
  ];

  return (
    <Container>
      <Heading>If you had the chance to vote now, who would you vote for?</Heading>
      <TilesContainer>
        {candidates.map((candidate, index) => (
          <CandidateTile 
            key={index}
            name={candidate.name}
            image={candidate.image}
          />
        ))}
      </TilesContainer>
    </Container>
  );
};

export default VotingPage;
