import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #0000;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const CandidateList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CandidateItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  color: #555;
`;

const Percentage = styled.span`
  margin-left: 20px; /* Adjust this value to increase/decrease the space */
  font-weight: bold;
  color: #00000; 
`;

const formatPercentage = (value) => {
  if (value === 'N/A') return 'N/A';
  const percentage = (parseFloat(value)).toFixed(1);
  return `${percentage}%`;
};

const WinPredictionDisplay = () => {
  const [data, setData] = useState({
    'Anura Kumara Dissanayake': 'N/A',
    'Ranil Wickramasinghe': 'N/A',
    'Sajith Premadasa': 'N/A'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/WinPrediction');
        const result = await response.json();
        setData({
          'Anura Kumara Dissanayake': result['Anura Kumara Dissanayake'] || 'N/A',
          'Ranil Wickramasinghe': result['Ranil Wickramasinghe'] || 'N/A',
          'Sajith Premadasa': result['Sajith Premadasa'] || 'N/A'
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Title>Current Win Predictions</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CandidateList>
          {Object.keys(data).map(candidate => (
            <CandidateItem key={candidate}>
              {candidate}
              <Percentage>{formatPercentage(data[candidate])}</Percentage>
            </CandidateItem>
          ))}
        </CandidateList>
      )}
    </Container>
  );
};


export default WinPredictionDisplay;

