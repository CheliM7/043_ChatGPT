import styled from 'styled-components';
import AKD from '../assets/AKD.jpg';
import RW from '../assets/RW.jpg';
import SP from '../assets/SP.jpeg';
import React, { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #f7f8fa;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
  margin: 40px auto;

  @media (max-width: 768px) {
    padding: 25px;
    margin: 20px auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 700;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 22px;
    text-align: center;
  }
`;

const InfoIcon = styled.span`
  font-size: 18px;
  cursor: pointer;
  border: 2px solid #1a73e8;
  border-radius: 20%;
  padding: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(26, 115, 232, 0.1);
    transform: scale(1.1);
  }
`;

const InfoText = styled.p`
  margin-top: 15px;
  padding: 15px 30px;
  background-color: rgba(250, 250, 250, 0.9);
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  font-size: 15px;
  color: #555;
  font-family: 'Roboto', sans-serif;
  line-height: 1.5;
  max-width: 80%;
  text-align: center;
`;

const SubsectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  width: 100%;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const Subsection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px;
  border-radius: 15px;
  width: 30%;
  transition: transform 0.3s ease, background-color 0.3s ease;
  font-family: 'Open Sans', sans-serif;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 85%;
  }
`;

const RedSubsection = styled(Subsection)`
  background: linear-gradient(145deg, #ff8c8c, #ff4d4d);
`;

const GreenSubsection = styled(Subsection)`
  background: linear-gradient(145deg, #98fb98, #32cd32);
`;

const YellowSubsection = styled(Subsection)`
  background: linear-gradient(145deg, #ffd700, #ffa500);
`;

const Image = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const NameAndParty = styled.div`
  margin-top: 15px;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #333;

  & .name {
    font-size: 20px;
    font-weight: bold;
    padding: 6px 12px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }

  & .separator {
    width: 60px;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 6px auto;
    border-radius: 3px;
  }

  & .party {
    font-size: 15px;
    font-weight: normal;
    color: #777;
  }
`;

const ThreeSectionContainer = ({
  images = [AKD, RW, SP],
  names = ["Anura Kumara Dissanayake", "Ranil Wickremesinghe", "Sajith Premadasa"],
  parties = ["National People's Power", "Independent", "Samagi Jana Balawegaya"]
}) => {
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
      </SubsectionContainer>

      {/* Remove the ChartContainer */}
    </Container>
  );
};

export default ThreeSectionContainer;