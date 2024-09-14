import React from 'react';
import { useNavigate } from 'react-router-dom';
import startbg from '../assets/startPageBG.png'; 
import sl from '../assets/sl.png';

const StartPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home'); 
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      <img src={sl} alt="Sri Lanka Flag" style={styles.flag} />  {/* Flag Image */}
      <h1 style={styles.mainText}>ELECTIONS 2024</h1>
      <hr style={styles.horizontalLine} />
      <p style={styles.secondaryText}>ශ්‍රී ලංකා මැතිවරණ 2024</p> 
      <p style={styles.secondaryText}>இலங்கை தேர்தல் 2024</p>
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
  flag: {
    width: '150px',  
    height: 'auto',  
    marginBottom: '0px',  
  },
  mainText: {
    margin: 0,
    color: '#fff',
    fontSize: '4rem',  // Increased font size for the English text
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
    transition: 'transform 0.3s ease',
    zIndex: 1,
  },
  horizontalLine: {
    width: '30%',  // Reduced the width for a smaller line
    border: '1px solid #fff',
    margin: '10px 0',
  },
  secondaryText: {
    margin: 0,
    color: '#fff',
    fontSize: '2rem',  // Smaller font size for Sinhala and Tamil texts
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', 
    transition: 'transform 0.3s ease',
    zIndex: 1,
  }
};

export default StartPage;
