
import styled from 'styled-components';
import AKD from '../assets/AKD.jpg';
import RW from '../assets/RW.jpg';
import SP from '../assets/SP.jpeg';
import ApexChart from './apexchart';
import React, { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: rgba(150, 150, 150, 0.5);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  max-width: 1100px;
  width: 100%;
  margin: 30px auto;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 15px auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #000;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);

  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
  }
`;

const InfoIcon = styled.span`
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #fff;
  border-radius: 20%;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const InfoText = styled.p`
  margin-top: 1px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.6px;
  line-height: 1.0;
  max-width: 80%;
  text-align: center;
`;

const SubsectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  flex-wrap: nowrap; /* Ensure horizontal alignment */
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px; /* Reduced gap between items */
  }
`;

const Subsection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
  width: 30%;
  transition: transform 0.3s ease, background-color 0.3s ease;
  position: relative;
  font-family: 'Open Sans', sans-serif;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6), inset 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-10px);
  }

  @media (max-width: 768px) {
    width: 80%; /* Full width on smaller screens */
  }
`;

const RedSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.6), rgba(220, 20, 60, 0.3)), rgba(0, 0, 0, 0.4);
`;

const GreenSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(0, 100, 0, 0.6), rgba(50, 205, 50, 0.3)), rgba(0, 0, 0, 0.4);
`;

const YellowSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.6), rgba(255, 215, 0, 0.3)), rgba(0, 0, 0, 0.4);
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const NameAndParty = styled.div`
  margin-top: 10px;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  color: #fff;

  & .name {
    font-size: 18px;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 4px 8px;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 5px;
  }

  & .separator {
    width: 50px;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    margin: 5px auto;
    border-radius: 2px;
  }

  & .party {
    font-size: 14px;
    font-weight: normal;
    font-family: 'Roboto', sans-serif;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px; /* Increase the max-width as needed */
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-left: 55px; /* Adjust this value to move the container more to the right */

  @media (max-width: 768px) {
    margin-top: 5px;
    margin-left: 10px; /* Adjust for smaller screens if needed */
  }
`;


const ThreeSectionContainer = ({ 
  images = [AKD, RW, SP], 
  names = ["Anura Kumara Dissanayake", "Ranil Wickremesinghe", "Sajith Premadasa"], 
  parties = ["National People's Power", "Independent", "Samagi Jana Balawegaya"] 
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [chartData, setChartData] = useState({ akd: 0, rw: 0, sp: 0 });

  useEffect(() => {
    // Fetch data from Flask backend
    fetch('http://127.0.0.1:5000/api/WinPrediction')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        console.log(data["Anura Kumara Dissanayake"]);
        setChartData({
          akd: data["Anura Kumara Dissanayake"],
          rw: data["Ranil Wickramasinghe"],
          sp: data["Sajith Premadasa"]
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Container>
      <Header>
        <Title>Win Predictor for the Sri Lanka Presidential Elections 2024</Title>
        <InfoIcon onClick={() => setShowInfo(!showInfo)}>i</InfoIcon>
      </Header>

      {showInfo && (
        <InfoText>
          This win predictor was created for an ongoing competition for learning purposes by using publicly available data.
        </InfoText>
      )}

      <SubsectionContainer>
        <RedSubsection>
          <Image src={images[0]} alt="image-1" />
          <NameAndParty>
            <div className="name">{names[0]}</div>
            <div className="separator"></div>
            <div className="party">{parties[0]}</div>
          </NameAndParty>
        </RedSubsection>
        <GreenSubsection>
          <Image src={images[1]} alt="image-2" />
          <NameAndParty>
            <div className="name">{names[1]}</div>
            <div className="separator"></div>
            <div className="party">{parties[1]}</div>
          </NameAndParty>
        </GreenSubsection>
        <YellowSubsection>
          <Image src={images[2]} alt="image-3" />
          <NameAndParty>
            <div className="name">{names[2]}</div>
            <div className="separator"></div>
            <div className="party">{parties[2]}</div>
          </NameAndParty>
        </YellowSubsection>
      </SubsectionContainer>

      <ChartContainer>
        <ApexChart akd={chartData.akd} rw={chartData.rw} sp={chartData.sp} />
      </ChartContainer>
    </Container>
  );
};

export default ThreeSectionContainer;
