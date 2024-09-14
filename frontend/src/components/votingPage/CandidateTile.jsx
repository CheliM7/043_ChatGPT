// CandidateTile.jsx
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

  @media (max-width: 768px) { /* Adjust the breakpoint as needed */
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
  return (
    <Tile>
      <Image src={image} alt={name} />
      <Content>
        <Name>{name}</Name>
      </Content>
    </Tile>
  );
};

export default CandidateTile;
