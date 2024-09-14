import React from 'react';
import styled from 'styled-components';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  width: 250px;
  height: 450px;
  position: relative;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Content = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-sizing: border-box;
  z-index: 2;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 18px;
  z-index: 2;
`;

const CandidateTile = ({ name, image }) => {
  const handleClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.text();
      alert('Vote counted for ' + name);
      console.log(result);
    } catch (error) {
      console.error('Error sending vote:', error);
      alert('Failed to count vote');
    }
  };

  return (
    <Tile onClick={handleClick}>
      <Image src={image} alt={name} />
      <Content>
        <Name>{name}</Name>
      </Content>
    </Tile>
  );
};

export default CandidateTile;
