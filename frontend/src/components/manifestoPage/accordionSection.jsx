import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccordionSection = ({ imageUrl, title, subsection1, subsection2, subsection3 }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="accordion-section" style={accordionContainerStyle}>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          style={accordionSummaryStyle(imageUrl)}
        >
          <div style={overlayStyle}></div>
          <h2 style={titleStyle}>{title}</h2>
        </AccordionSummary>
        <AccordionDetails style={accordionDetailsStyle}>
          <div className="subsection-tile" style={subsectionStyle}>
            <h3 style={subsectionTitleStyle}>Anura Dissanayake</h3> {/* Hardcoded title */}
            {subsection1}  {/* Display subsection 1 content */}
          </div>
          <div className="subsection-tile" style={subsectionStyle}>
            <h3 style={subsectionTitleStyle}>Sajith Premadasa</h3> {/* Hardcoded title */}
            {subsection2}  {/* Display subsection 2 content */}
          </div>
          <div className="subsection-tile" style={subsectionStyle}>
            <h3 style={subsectionTitleStyle}>Ranil Wickremasinghe</h3> {/* Hardcoded title */}
            {subsection3}  {/* Display subsection 3 content */}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

// Style for accordion container
const accordionContainerStyle = {
  position: 'relative',
  width: '80%',
  margin: '0 auto'
};

// Style for the accordion summary background
const accordionSummaryStyle = (imageUrl) => ({
  padding: 0,
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  background: `url(${imageUrl}) no-repeat center center`,
  backgroundSize: 'cover',
  height: '250px',
  color: '#fff',
  textAlign: 'center',
  position: 'relative'
});

// Overlay style for darkened effect on image
const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '10px',
  zIndex: 1
};

// Style for title (centered on the accordion image)
const titleStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  margin: 0,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  zIndex: 2
};

// Style for accordion details container
const accordionDetailsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
  gap: '10px'
};

// Style for each subsection content box
const subsectionStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly translucent
  borderRadius: '8px',
  padding: '15px',
  width: '30%',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

// Style for subsection titles
const subsectionTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#333'
};

export default AccordionSection;