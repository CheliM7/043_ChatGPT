import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Tooltip, Box, useMediaQuery } from '@mui/material';
import { Person, Description, HowToVote } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for responsiveness

const NavBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#f8f9fa',
  color: '#000',
  padding: isSmallScreen ? '5px 10px' : '10px 20px',
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)', // Increased bottom shadow
  borderBottom: `1px solid ${theme.palette.divider}`, // Subtle border for added depth
}));


  const ElectionInfo = styled(Box)(({ theme }) => ({
    textAlign: isSmallScreen ? 'center' : 'left',
    padding: '10px',
  }));

  const ElectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: isSmallScreen ? '1.2rem' : '1.7rem',
    fontFamily: 'Georgia, serif',
    color: '#1d3557',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', // Slight shadow for text depth
    cursor: 'pointer',
  }));

  const DateInfo = styled(Typography)(({ theme }) => ({
    fontSize: isSmallScreen ? '0.8rem' : '1rem',
    marginTop: '5px',
    color: '#457b9d',
  }));

  const RightSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: isSmallScreen ? '10px' : '20px',
    marginLeft: isSmallScreen ? '0' : 'auto',
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: isSmallScreen ? 'center' : 'flex-end',
  }));

  const VoteButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '1rem',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Shadow for button depth
    '&:hover': {
      backgroundColor: '#218838',
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)', // Enhanced shadow on hover
    },
  }));

  return (
    <NavBarContainer position="static">
      <Toolbar sx={{ flexDirection: isSmallScreen ? 'column' : 'row' }}>
        {/* Election Info */}
        <ElectionInfo>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <ElectionTitle variant="h6">
              PRESIDENTIAL ELECTIONS '24
            </ElectionTitle>
          </Link>
          <DateInfo variant="body2">
            Date: {currentTime.toLocaleDateString()} | Time: {currentTime.toLocaleTimeString()} | Location: Sri Lanka
          </DateInfo>
        </ElectionInfo>

        <RightSection>
          <Tooltip title="View Candidates" arrow>
            <Link to="/candidates" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box display="flex" alignItems="center" gap="10px">
                <Person sx={{ fontSize: '2rem' }} />
                <Typography variant="body1">Candidates</Typography>
              </Box>
            </Link>
          </Tooltip>

          <Tooltip title="Read Manifestos" arrow>
            <Link to="/manifestos" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box display="flex" alignItems="center" gap="10px">
                <Description sx={{ fontSize: '2rem' }} />
                <Typography variant="body1">Manifestos</Typography>
              </Box>
            </Link>
          </Tooltip>

          <Tooltip title="Cast Your Vote in our Poll" arrow>
            <Link to="/vote" style={{ textDecoration: 'none' }}>
              <VoteButton variant="contained" startIcon={<HowToVote />}>
                VOTE
              </VoteButton>
            </Link>
          </Tooltip>
        </RightSection>
      </Toolbar>
    </NavBarContainer>
  );
};

export default NavBar;
