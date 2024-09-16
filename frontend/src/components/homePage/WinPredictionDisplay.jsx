import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AKD from '../../assets/AKD.jpg';
import RW from '../../assets/RW.jpg';
import SP from '../../assets/SP.jpeg';

// Styled components
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
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  color: #555;
  gap: 20px; /* Space between the image and the details */
`;

const Image = styled.img`
  width: 80px; /* Increased width */
  height: 80px; /* Increased height */
  border-radius: 50%;
  margin-right: 30px; /* Adds space after the image */
  border: 2px solid #000; /* Adds a small black border */
`;

const Abbreviation = styled.span`
  font-weight: bold;
  color: #333;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Ensures Details takes up remaining space */
  gap: 1.5px; /* Space between the details lines */
  margin-right: 50px; /* Increased space after the details */
  white-space: nowrap; /* Prevents wrapping within Details */
`;

const FullName = styled.span`
  color: #555;
  margin-bottom: 5px; /* Adds space after the name */
  white-space: nowrap; /* Prevents wrapping of the name */
  overflow: hidden; /* Hides overflowed text */
  text-overflow: ellipsis; /* Adds ellipsis for overflowed text */
`;

const Party = styled.span`
  color: #777;
`;

const Percentage = styled.span`
  font-weight: bold;
  color: #000;
  margin-left: auto; /* Pushes Percentage to the right edge */
  padding-left: 40px; /* Increased space between the details and the percentage */
`;

const InfoText = styled.p`
  font-size: 12px; /* Very small text */
  color: #666; /* Subtle gray color */
  text-align: center;
  margin-top: 20px; /* Adds space above the info text */
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

  const candidates = {
    'Anura Kumara Dissanayake': {
      abbreviation: 'AKD',
      fullName: 'Anura Kumara Dissanayake',
      party: 'National People\'s Power',
      image: AKD
    },
    'Ranil Wickramasinghe': {
      abbreviation: 'RW',
      fullName: 'Ranil Wickramasinghe',
      party: 'Independent',
      image: RW
    },
    'Sajith Premadasa': {
      abbreviation: 'SP',
      fullName: 'Sajith Premadasa',
      party: 'Samagi Jana Balawegaya',
      image: SP
    }
  };

  return (
    <Container>
      <Title>Current Win Predictions</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CandidateList>
          {Object.keys(data).map(candidate => (
            <CandidateItem key={candidate}>
              <Image src={candidates[candidate].image} alt={candidate} />
              <Details>
                <Abbreviation>{candidates[candidate].abbreviation}</Abbreviation>
                <FullName>{candidates[candidate].fullName}</FullName>
                <Party>{candidates[candidate].party}</Party>
              </Details>
              <Percentage>{formatPercentage(data[candidate])}</Percentage>
            </CandidateItem>
          ))}
        </CandidateList>
      )}
      <InfoText>
        This is the current win prediction for each candidate. Factors link live sentiment score, Public and built-in polls counts are taken into account.
      </InfoText>
    </Container>
  );
};

export default WinPredictionDisplay;