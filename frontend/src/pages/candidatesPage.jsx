import React from 'react';
import CandidateTable from '../components/candidates';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Example height of the navbar
const NAVBAR_HEIGHT = '120px'; // Update this value based on your actual navbar height

// Styled Button Component
// Styled Button Component
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
  color: #0056b3; /* Icon color */
  border: 2px solid #0056b3; /* Border color */
  border-radius: 50%; /* Circle shape */
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background-color: #0056b3; /* Button background color on hover */
    color: #fff; /* Icon color on hover */
    border-color: #0056b3; /* Border color on hover */
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
