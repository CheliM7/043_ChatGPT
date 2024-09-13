import React from 'react';
import { useNavigate } from 'react-router-dom';
import startbg from '../assets/startPageBG.png'; 

const StartPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home'); 
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <h1 style={styles.text}>SL ELECTIONS 2024</h1>
      <p style={styles.text}>ශ්‍රී ලංකා මැතිවරණ 2024</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage: `url(${startbg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
    textAlign: 'center',
    cursor: 'pointer',
    overflow: 'hidden', 
  },
  text: {
    margin: 0,
    color: '#fff',
    textAlign: 'center',
    fontSize: '3rem', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
    transition: 'transform 0.3s ease',
    zIndex: 1,
  },
  textHover: {
    transform: 'scale(1.1)', 
  }
};

const GlobalStyles = {
  html: {
    margin: 0,
    padding: 0,
    overflow: 'hidden', 
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box', 
  },
  body: {
    margin: 0,
    padding: 0,
    overflow: 'hidden',  
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',  
  }
};

export default StartPage;
