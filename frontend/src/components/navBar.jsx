import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Tooltip, Box, useMediaQuery } from '@mui/material';
import { AccountCircle, Description, Poll, CheckCircle, Quiz } from '@mui/icons-material'; // Import CheckCircle icon
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const NavBarContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#4A1F1A', // Dark Wine Red
  color: '#F4C300', // Sri Lankan Flag Yellow
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  borderBottom: '2px solid #F4C300',
  borderRadius: '0 0 15px 15px',
  padding: '8px 16px', // Reduced padding for a lower height
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5),
}));

const ElectionInfo = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: '4px 8px',
  flex: 1,
}));

const ElectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.4rem', // Reduced font size
  fontFamily: 'Roboto, sans-serif',
  color: '#F4C300',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  marginBottom: theme.spacing(0.5),
}));

const DateInfo = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem', // Reduced font size
  color: '#E0E0E0',
  marginTop: '5px',
}));

const RightSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '72px', // Reduced gap
  flexDirection: 'row',
  justifyContent: 'flex-end',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '8px',
  },
}));

const VoteButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#F4C300', // Sri Lankan Flag Yellow
  color: '#8B0000', // Dark Crimson Red
  padding: '8px 16px', // Reduced padding
  borderRadius: '10px', // Slightly reduced border-radius
  fontSize: '0.9rem', // Reduced font size
  fontWeight: 'bold',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  '&:hover': {
    backgroundColor: '#E0A800',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.4)',
  },
}));

const IconButton = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#F4C300',
  '&:hover': {
    color: '#E0A800',
  },
}));

const NavBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <NavBarContainer position="static">
      <ToolbarStyled>
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
              <IconButton>
                <AccountCircle sx={{ fontSize: '1.8rem' }} /> {/* Reduced icon size */}
                <Typography variant="body1">Candidates</Typography>
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Read Manifestos" arrow>
            <Link to="/manifestos" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton>
                <Description sx={{ fontSize: '1.8rem' }} /> {/* Reduced icon size */}
                <Typography variant="body1">Manifestos</Typography>
              </IconButton>
            </Link>
          </Tooltip>

          {/* Fact Checker */}
          <Tooltip title="Check Facts" arrow>
            <Link to="/factchecker" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton>
                <CheckCircle sx={{ fontSize: '1.8rem' }} /> {/* CheckCircle icon */}
                <Typography variant="body1">Fact Checker</Typography>
              </IconButton>
            </Link>
          </Tooltip>
          
          {/* Quiz Bot */}
          <Tooltip title="Quiz Bot" arrow>
            <Link to="/quiz" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton>
                <Quiz sx={{ fontSize: '1.8rem' }} /> {/* CheckCircle icon */}
                <Typography variant="body1">Quiz Bot</Typography>
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title="Cast Your Vote in our Poll" arrow>
            <Link to="/vote" style={{ textDecoration: 'none' }}>
              <VoteButton variant="contained" startIcon={<Poll />}>
                VOTE
              </VoteButton>
            </Link>
          </Tooltip>
        </RightSection>
      </ToolbarStyled>
    </NavBarContainer>
  );
};

export default NavBar;
