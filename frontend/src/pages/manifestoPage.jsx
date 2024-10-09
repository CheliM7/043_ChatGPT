import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QnASection from '../components/manifestoPage/qnaSection2';
import SidebarSection from '../components/manifestoPage/sidebarSection';

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

// ManifestoPage Component
const ManifestoPage = () => {
  const qnaRef = useRef(null);

  useEffect(() => {
    // Set the body background color to white
    document.body.style.backgroundColor = '#FFFFFF'; // White color

    // Clean up by resetting the background color when the component is unmounted
    return () => {
      document.body.style.backgroundColor = ''; // Reset to default
    };
  }, []);

  // Scroll to the QnA section
  const handleScrollToQnA = () => {
    if (qnaRef.current) {
      qnaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Button href="/home" title="Go to Home">
        <ArrowBackIcon />
      </Button>
      <h1 style={styles.title}>Manifesto</h1>
      <div style={styles.layout}>
        <div style={styles.sidebar}>
          <div style={styles.buttonContainer}>
            <button onClick={handleScrollToQnA} style={styles.askButton}>
              Have questions regarding Manifestos? Ask now!
            </button>
          </div>
          <div style={styles.sidebarContent}>
            <SidebarSection />
          </div>
        </div>
      </div>
      <div ref={qnaRef} style={styles.qna}>
        <QnASection />
      </div>
    </>
  );
};

// Inline Styles for the ManifestoPage component
const styles = {
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#4A1F1A',
    textAlign: 'center', // Center align the title
  },
  paragraph: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    textAlign: 'center', // Center align the intro paragraph
    marginBottom: '20px',
    maxWidth: '80%', // Optional to limit text width
    margin: '0 auto', // Center the paragraph on the page
  },
  layout: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1200px', // Set a max-width to prevent overflow
    margin: '0 auto', // Center the layout
    boxSizing: 'border-box', // Include padding in width
    padding: '0 10px', // Adjust padding to prevent overflow
  },
  sidebar: {
    flex: '1', // Allow the sidebar to grow and shrink, but ensure it's flexible
    paddingRight: '10px', // Adjust padding to prevent overflow
    boxSizing: 'border-box', // Include padding in width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center', // Center the button horizontally
    marginBottom: '20px', // Ensure there's space below the button
  },
  askButton: {
    backgroundColor: '#4A1F1A',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  sidebarContent: {
    width: '100%', // Ensure sidebar content takes full width
  },
  qna: {
    flex: '1', // Allow the QnA section to grow and shrink
    marginTop: '40px',
    paddingLeft: '10px', // Adjust padding to prevent overflow
    boxSizing: 'border-box', // Include padding in width
  },
};

export default ManifestoPage;
