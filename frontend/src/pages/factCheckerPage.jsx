import React, { useState } from 'react';
import styled from 'styled-components';
import FactChecker from '../components/fact-checkerPage/factChecker';

// Wrapper to add space above the FactChecker
const Wrapper = styled.div`
  margin-top: 20px; /* Adds gap above the FactChecker */
`;

const FactCheckerPage = () => {
  const [fact, setFact] = useState('');
  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    setFact(event.target.value);
  };

  const handleCheckFact = () => {
    const isTrue = fact.toLowerCase() === 'earth is round';
    setResult(isTrue ? 'This fact is true!' : 'This fact is false.');
  };

  return (
    <Wrapper>
      <FactChecker />
    </Wrapper>
  );
};

export default FactCheckerPage;
