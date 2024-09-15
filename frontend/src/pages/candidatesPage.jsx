import React from 'react';
import CandidateTable from '../components/candidates';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
 
const NAVBAR_HEIGHT = '120px';  
 
const Button = styled.a`
  position: fixed;
  top: calc(${NAVBAR_HEIGHT} + 20px); /* Space from the top of the viewport plus a margin */
  left: 40px;
  width: 40px; /* Width of the circle */
  height: 40px; /* Height of the circle */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent; /* Transparent background */
  color: #4A1F1A; /* Icon color */
  border: 2px solid #4A1F1A; /* Border color */
  border-radius: 50%; /* Circle shape */
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #4A1F1A; /* Button background color on hover */
    color: #fff; /* Icon color on hover */
    border-color: #4A1F1A; /* Border color on hover */
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`;


const CandidatesPage = () => {
  return (
    <div>
      <Button href="/home" title="Go to Home">
        <ArrowBackIcon />
      </Button>
      <CandidateTable />
    </div>
  );
};

export default CandidatesPage;