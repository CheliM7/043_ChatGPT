import React, { useState } from 'react';
import styled from 'styled-components';
import AKD from '../assets/AKD.jpg';
import RW from '../assets/RW.jpg';
import SP from '../assets/SP.jpeg';
import ApexChart from './apexchart';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px; /* Increased padding */
  background-color: rgba(150, 150, 150, 0.5); /* Darker grey with a bit more black hue */
  backdrop-filter: blur(15px); /* Glassmorphism effect */
  border-radius: 20px; /* Slightly larger border radius for a softer look */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); /* Deeper shadow for more depth */
  max-width: 1100px; /* Increased the width */
  width: 100%;
  margin: 30px auto; /* Increased margin */
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px; /* Reduced font size */
  color: #000; /* Black font for contrast */
  font-family: 'Poppins', sans-serif; /* Modern, clean font */
  letter-spacing: 1px; /* Slight letter spacing */
  text-transform: uppercase; /* Uppercase for emphasis */
  margin-bottom: 10px;
  font-weight: 600; /* Make the title bold */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6); /* Shadow for depth */
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
  justify-content: space-around;
  gap: 20px;
  width: 100%;
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
  backdrop-filter: blur(10px); /* Adds blur for glassmorphism effect */
  background: rgba(0, 0, 0, 0.4); /* Black transparent background */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Light border for contrast */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6), /* Outer shadow for depth */
              inset 0 4px 8px rgba(0, 0, 0, 0.3); /* Inner shadow for 3D effect */

  &:hover {
    transform: translateY(-10px);
  }
`;

const RedSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.6), rgba(220, 20, 60, 0.3)), rgba(0, 0, 0, 0.4); 
  /* Darker red gradient with black transparency */
`;

const GreenSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(0, 100, 0, 0.6), rgba(50, 205, 50, 0.3)), rgba(0, 0, 0, 0.4); 
  /* Darker green gradient with black transparency */
`;

const YellowSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.6), rgba(255, 215, 0, 0.3)), rgba(0, 0, 0, 0.4); 
  /* Darker yellow gradient with black transparency */
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const NameAndParty = styled.div`
  margin-top: 10px;
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  color: #fff; /* White for contrast */

  /* Style for the name */
  & .name {
    font-size: 18px;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.2); /* Light background to highlight the name */
    padding: 4px 8px;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 5px;
  }

  /* Style for the horizontal line */
  & .separator {
    width: 50px;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.5); /* Light separator line */
    margin: 5px auto;
    border-radius: 2px;
  }

  /* Style for the party */
  & .party {
    font-size: 14px;
    font-weight: normal;
    font-family: 'Roboto', sans-serif; /* Secondary font */
  }
`;

const ThreeSectionContainer = ({ scores = [0, 0, 0], images = [AKD, RW, SP], 
  names = ["Anura Kumara Dissanayake", "Ranil Wickremesinghe", "Sajith Premadasa"], 
  parties = ["National People's Power", "Independent", "Samagi Jana Balawegaya"] }) => {
  const [showInfo, setShowInfo] = useState(false);

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
        <ApexChart akd={45} rw={20} sp={15} />
      </SubsectionContainer>
    </Container>
  );
};

export default ThreeSectionContainer;