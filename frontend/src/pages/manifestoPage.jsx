import React, { useEffect, useRef } from 'react';
import QnASection from '../components/manifestoPage/qnaSection';
import SidebarSection from '../components/manifestoPage/sidebarSection';

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
