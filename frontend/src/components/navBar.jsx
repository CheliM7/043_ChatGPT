import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Tooltip, Box, useMediaQuery } from '@mui/material';
import { Person, Description, HowToVote } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint for responsiveness

  // Styled Components
  const NavBarContainer = styled(AppBar)({
    backgroundColor: '#f8f9fa',
    color: '#000',
    padding: isSmallScreen ? '5px 10px' : '10px 20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  });

  const ElectionInfo = styled(Box)({
    textAlign: isSmallScreen ? 'center' : 'left',
    padding: '10px',
  });

  const ElectionTitle = styled(Typography)({
    fontWeight: 'bold',
    fontSize: isSmallScreen ? '1.2rem' : '1.7rem',
    fontFamily: 'Georgia, serif',
    color: '#1d3557',
    textShadow: '2px 2px 4px #aaa',
    cursor: 'pointer',
  });

  const DateInfo = styled(Typography)({
    fontSize: isSmallScreen ? '0.8rem' : '1rem',
    marginTop: '5px',
    color: '#457b9d',
  });

  const RightSection = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: isSmallScreen ? '10px' : '20px',
    marginLeft: isSmallScreen ? '0' : 'auto',
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: isSmallScreen ? 'center' : 'flex-end',
  });

  const VoteButton = styled(Button)({
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#218838',
    },
  });

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

        {/* Right Aligned Section */}
        <RightSection>
          {/* Candidates Section */}
          <Tooltip title="View Candidates" arrow>
            <Link to="/candidates" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box display="flex" alignItems="center" gap="10px">
                <Person sx={{ fontSize: '2rem' }} />
                <Typography variant="body1">Candidates</Typography>
              </Box>
            </Link>
          </Tooltip>

          {/* Manifestos Section */}
          <Tooltip title="Read Manifestos" arrow>
            <Link to="/manifestos" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box display="flex" alignItems="center" gap="10px">
                <Description sx={{ fontSize: '2rem' }} />
                <Typography variant="body1">Manifestos</Typography>
              </Box>
            </Link>
          </Tooltip>

          {/* Vote Button */}
          <Tooltip title="Cast Your Vote" arrow>
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
