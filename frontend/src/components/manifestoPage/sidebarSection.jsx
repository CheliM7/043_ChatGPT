import React from 'react';
import AccordionSection from './accordionSection'; 
import economy from '../../assets/accordionImgs/economy.jpg';
import education from '../../assets/accordionImgs/education.jpeg';
import social from '../../assets/accordionImgs/social.png';
import law from '../../assets/accordionImgs/law.jpg';
import sustainability from '../../assets/accordionImgs/sustainability.jpg';

const SidebarSection = () => {
  return (
    <div className="sidebar-section" style={sidebarSectionStyle}>
      {/* Economy Section */}
      <div style={accordionWrapperStyle}>
        <AccordionSection
          imageUrl={economy}
          title="Economy"
          subsection1={subsectionTemplate(economyText1)}
          subsection2={subsectionTemplate(economyText2)}
          subsection3={subsectionTemplate(economyText3)}
        />
      </div>

      {/* Education Section */}
      <div style={accordionWrapperStyle}>
        <AccordionSection
          imageUrl={education}
          title="Education"
          subsection1={subsectionTemplate(educationText1)}
          subsection2={subsectionTemplate(educationText2)}
          subsection3={subsectionTemplate(educationText3)}
        />
      </div>

      {/* Law Section */}
      <div style={accordionWrapperStyle}>
        <AccordionSection
          imageUrl={law}
          title="Law"
          subsection1={subsectionTemplate(lawText1)}
          subsection2={subsectionTemplate(lawText2)}
          subsection3={subsectionTemplate(lawText3)}
        />
      </div>

      {/* Social Section */}
      <div style={accordionWrapperStyle}>
        <AccordionSection
          imageUrl={social}
          title="Social"
          subsection1={subsectionTemplate(socialText1)}
          subsection2={subsectionTemplate(socialText2)}
          subsection3={subsectionTemplate(socialText3)}
        />
      </div>

      {/* Sustainability Section */}
      <div style={accordionWrapperStyle}>
        <AccordionSection
          imageUrl={sustainability}
          title="Sustainability"
          subsection1={subsectionTemplate(sustainabilityText1)}
          subsection2={subsectionTemplate(sustainabilityText2)}
          subsection3={subsectionTemplate(sustainabilityText3)}
        />
      </div>
    </div>
  );
};

// Styling
const sidebarSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  backgroundColor: '#f9f9f9',
};

// Add a margin to create space between accordion sections
const accordionWrapperStyle = {
  marginBottom: '15px', // Adjust this value for the desired gap
};

const subsectionTemplate = (content) => (
  <div style={subsectionStyle}>
    <ul style={listStyle}>
      {content.map((item, index) => (
        <li key={index} style={listItemStyle}>
          <strong>{item.title}:</strong> {item.description}
        </li>
      ))}
    </ul>
  </div>
);

const subsectionStyle = {
  backgroundColor: '#fff',
  padding: '10px 20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const listStyle = {
  paddingLeft: '20px',
  fontSize: '15px',
  lineHeight: '1.8',
  fontFamily: '"Roboto", Arial, sans-serif',
};

const listItemStyle = {
  marginBottom: '10px',
  color: '#333',
  fontWeight: 'normal',
};

// Content for sections
const economyText1 = [
  { title: 'IT Industry Development', description: 'Plans to boost the IT industry by addressing brain drain and increasing funding.' },
  { title: 'Digitalization', description: 'Focuses on digitizing government institutions to improve service delivery and transparency.' },
  { title: 'Supporting Thrust Industries', description: 'Proposes support for digital technology startups and collaborations with global tech leaders.' },
  { title: 'Regional R&D Centers and IT Parks', description: 'Aims to foster innovation through regional R&D centers and IT parks.' },
  { title: 'Rebranding Sri Lanka\'s IT Industry', description: 'Plans to position Sri Lanka as a hub for high-value IT products and services.' },
];

const economyText2 = [
  { title: 'Social Market Economy', description: 'Advocates for a globally connected economy with private enterprise as the primary driver of growth.' },
  { title: 'Addressing Economic Crisis', description: 'Plans to lower inflation, boost foreign reserves, and improve market signals.' },
  { title: 'Monetary and Exchange Rate Policy', description: 'Supports CBSL autonomy, low and stable interest rates, and competitive foreign exchange rates.' },
  { title: 'Revenue Growth', description: 'Aims to improve tax collection using digital platforms and increase transparency.' },
  { title: 'Inclusive Growth', description: 'Emphasizes resilience and equality to ensure no one is left behind.' },
];

const economyText3 = [
  { title: 'Theravada Trade Economy', description: 'Proposes an export-oriented economy focusing on manufacturing and services.' },
  { title: 'Government Sector', description: 'Emphasizes competitive operation of government-owned enterprises.' },
  { title: 'Peoples\' Sector', description: 'Introduces the concept of a "Peoples\' Sector" to prevent concentration of resources in state or private hands.' },
  { title: 'Employment Opportunities', description: 'Promises to create 100,000 jobs by 2025 through foreign investments and local development projects.' },
];

const educationText1 = [
  { title: 'Smart Schools', description: 'Aims to transform every school into a "smart school" with electricity, water, and digital learning platforms.' },
  { title: 'Teacher Vacancies', description: 'Plans to fill vacancies with qualified teachers, especially for religious teaching.' },
  { title: 'Early Childhood Education', description: 'Establishes a regulatory authority to upgrade early childhood education facilities.' },
  { title: 'Grade 5 Scholarship Exam', description: 'Plans to simplify and reduce the stress of the exam.' },
  { title: 'University Sector', description: 'Proposes restructuring the University Grants Commission and improving the international rankings of universities.' },
];

const educationText2 = [
  { title: 'Government Digitization', description: 'Focuses on digitizing government institutions for improved efficiency.' },
  { title: 'Supporting Thrust Industries', description: 'Proposes support for startups and collaborations with global technology leaders.' },
  { title: 'Regional R&D Centers and IT Parks', description: 'Plans to establish R&D centers and IT parks for innovation.' },
  { title: 'Rebranding Sri Lanka\'s IT Industry', description: 'Aims to position Sri Lanka as a hub for high-value IT products.' },
];

const educationText3 = [
  { title: 'Teacher Recruitment', description: 'Plans to recruit 2500 new teachers through a competitive examination.' },
  { title: 'Curriculum Revision', description: 'Proposes revising the school curriculum to make learning more engaging.' },
  { title: 'Vocational Training', description: 'Aims to upgrade vocational training institutions to university level.' },
  { title: 'Madrasa Education', description: 'Plans to develop Madrasa education to support Islamic education.' },
];

const lawText1 = [
  { title: 'Broadening Fundamental Rights', description: 'Proposes including social, economic, cultural, and environmental rights.' },
  { title: 'Access to Justice', description: 'Ensures easier access by decentralizing Court of Appeal sittings and focusing on language rights.' },
  { title: 'Anti-Corruption', description: 'Considers corruption a violation of the Constitution and pledges to entrench anti-corruption measures.' },
  { title: 'Police Reform', description: 'Plans to update the 150-year-old Police Ordinance and modernize the police force.' },
  { title: 'Mediation Board', description: 'Proposes permanent offices for mediation within Divisional Secretariats.' },
];

const lawText2 = [
  { title: 'Communication Regulatory Commission', description: 'Plans to change the Telecommunications Regulatory Commission to the Communication Regulatory Commission - SL.' },
  { title: 'Regulatory Authority for Media', description: 'Proposes establishing a regulatory authority for media industries.' },
];

const lawText3 = [
  { title: 'Anti-Corruption Act', description: 'Highlights the introduction of the Anti-Corruption Act during his presidency.' },
  { title: 'Central Bank Act', description: 'Emphasizes reforms to the Central Bank Act and other laws.' },
  { title: 'Other Laws', description: 'Claims to have introduced approximately 100 new laws, covering areas like public finance, economic transformation, and online safety.' },
];

const socialText1 = [
  { title: 'Social Market Economy', description: 'Advocates for a globally connected economy with a focus on equality.' },
  { title: 'Social Welfare', description: 'Promises to strengthen welfare programs, including pensions and healthcare.' },
  { title: 'Women and Child Empowerment', description: 'Emphasizes women’s access to education and employment, and protecting children’s rights.' },
  { title: 'Indigenous Communities', description: 'Plans to address the needs of historically excluded communities.' },
];

const socialText2 = [
  { title: 'Social Justice', description: 'Focuses on social justice and equality for all citizens.' },
  { title: 'Environmental Protection', description: 'Prioritizes sustainable development and natural resource protection.' },
];

const socialText3 = [
  { title: 'Social Order', description: 'Plans to establish a just social order based on the Constitution.' },
  { title: 'Women Empowerment Act', description: 'Highlights laws introduced to empower women and protect rights.' },
  { title: 'Online Safety Act', description: 'Introduces new safety regulations for online platforms.' },
];

const sustainabilityText1 = [
  { title: 'Sustainable Development Goals (SDGs)', description: 'Commits to achieving SDGs by 2030, with a focus on renewable energy and green jobs.' },
  { title: 'Climate Action', description: 'Proposes climate adaptation strategies for vulnerable communities.' },
  { title: 'Energy Transition', description: 'Aims to transition to 100% renewable energy by 2050.' },
  { title: 'Green Economy', description: 'Supports developing a green economy with nature-based solutions.' },
];

const sustainabilityText2 = [
  { title: 'Carbon Neutrality', description: 'Pledges to make Sri Lanka carbon neutral by 2050.' },
  { title: 'Waste Management', description: 'Focuses on waste reduction, recycling, and the circular economy.' },
];

const sustainabilityText3 = [
  { title: 'Forestry', description: 'Proposes large-scale reforestation projects and expanding protected areas.' },
  { title: 'Biodiversity', description: 'Prioritizes the protection of biodiversity and natural ecosystems.' },
];

export default SidebarSection;