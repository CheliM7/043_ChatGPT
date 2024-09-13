import React from 'react';
import styled from 'styled-components';
import AKD from '../assets/AKD.jpg';
import RW from '../assets/RW.jpg';
import SP from '../assets/SP.jpeg';

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding: 30px;
  background-color: #f0f4f8;
`;

const Subsection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 30%;
  transition: transform 0.3s ease, background-color 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
  }
`;

// Darker gradient backgrounds for each section
const RedSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(139, 0, 0, 0.8), rgba(220, 20, 60, 0.6));
`;

const GreenSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(0, 100, 0, 0.8), rgba(50, 205, 50, 0.6));
`;

const YellowSubsection = styled(Subsection)`
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.8), rgba(255, 215, 0, 0.6));
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const WinScore = styled.p`
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const ThreeSectionContainer = ({ scores = [0, 0, 0], images = [AKD, RW, SP] }) => {
  return (
    <Container>
      <RedSubsection>
        <Image src={images[0]} alt="image-1" />
        <WinScore>Win Score: {scores[0]}</WinScore>
      </RedSubsection>
      <GreenSubsection>
        <Image src={images[1]} alt="image-2" />
        <WinScore>Win Score: {scores[1]}</WinScore>
      </GreenSubsection>
      <YellowSubsection>
        <Image src={images[2]} alt="image-3" />
        <WinScore>Win Score: {scores[2]}</WinScore>
      </YellowSubsection>
    </Container>
  );
};

export default ThreeSectionContainer;
