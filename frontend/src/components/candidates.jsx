import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Global Style for Font Import
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
`;

// Styled Components for Button
const Button = styled.a`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #F4C300; /* Sri Lankan Flag Yellow */
  color: #8B0000; /* Dark Crimson Red */
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #E0A800; /* Lighter Yellow */
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`;

const Table = styled.table`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
  border-collapse: collapse;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const TableHeader = styled.th`
  background-color: #4A1F1A; /* Dark Wine Red */
  color: #F4C300; /* Sri Lankan Flag Yellow */
  padding: 15px 25px;
  text-align: left;
  border-bottom: 2px solid #F4C300; /* Sri Lankan Flag Yellow */
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  text-transform: uppercase;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 1rem;
  }
`;

const TableCell = styled.td`
  padding: 15px 25px;
  border-bottom: 1px solid #ddd;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 0.9rem;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f0; /* Very light brown */
  }
  &:nth-child(odd) {
    background-color: #ffffff; /* White for contrast */
  }
  &:hover {
    background-color: #e0e0e0; /* Light gray for hover effect */
  }
`;


const HighlightedCell = styled(TableCell)`
  color: #4A1F1A; /* Dark Wine Red */
  font-weight: 700;
`;

const Heading = styled.h2`
  text-align: center;
  font-size: 2.8rem;
  font-weight: 700;
  color: #4A1F1A; /* Dark Wine Red */
  margin-bottom: 25px;
  font-family: 'Merriweather', serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2),
               -1px -1px 3px rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;


const candidatesData = {
    major: [
        {
          name: 'Ranil Wickremesinghe (75)',
          party: 'Independent',
          office: 'Current President of Sri Lanka (since 2022), Leader of the United National Party (since 1994), Former Prime Minister',
          endorsements: 'United National Party, Breakaway members of the Sri Lanka Podujana Peramuna, Ceylon Workers\' Congress, etc.',
          notes: 'Declared 26 July 2024. Previously ran in 1999 and 2005. Election manifesto launched on 29 August 2024.',
          wikipedia: 'https://en.wikipedia.org/wiki/Ranil_Wickremesinghe',
        },
        {
          name: 'Sajith Premadasa (57)',
          party: 'Samagi Jana Balawegaya',
          office: 'Current Leader of the Opposition (since 2019), Leader of the Samagi Jana Balawegaya (since 2020)',
          endorsements: 'Samagi Jana Balawegaya, All Ceylon Makkal Congress, Freedom People\'s Congress, etc.',
          notes: 'Declared 16 May 2023. Son of former president Ranasinghe Premadasa. Previously ran in 2019. Election manifesto launched on 29 August 2024.',
          wikipedia: 'https://en.wikipedia.org/wiki/Sajith_Premadasa',
        },
        {
          name: 'Anura Kumara Dissanayake (55)',
          party: 'National People\'s Power',
          office: 'Former Minister and Chief Opposition Whip (2015–2018), Leader of the National People\'s Power (since 2015)',
          endorsements: 'Janatha Vimukthi Peramuna',
          notes: 'Declared 29 August 2023. Previously ran in 2019. Election manifesto launched on 26 August 2024.',
          wikipedia: 'https://en.wikipedia.org/wiki/Anura_Kumara_Dissanayake',
        },
        {
          name: 'Field Marshal Sarath Fonseka (73)',
          party: 'Independent',
          office: '5th Chief of the Defence Staff (2009), Former Minister of Regional Development (2016–2018)',
          endorsements: '',
          notes: 'Declared 25 July 2024. Previously ran in 2010.',
          wikipedia: 'https://en.wikipedia.org/wiki/Sarath_Fonseka',
        },
        {
          name: 'Wijeyadasa Rajapakshe (65)',
          party: 'National Democratic Front',
          office: 'Former Minister of Justice (2022–2024)',
          endorsements: '',
          notes: 'Declared 25 July 2024.',
          wikipedia: 'https://en.wikipedia.org/wiki/Wijeyadasa_Rajapakshe',
        },
        {
          name: 'Namal Rajapaksa (38)',
          party: 'Sri Lanka Podujana Peramuna',
          office: 'Former Minister of Youth and Sports (2020–2022)',
          endorsements: 'Sri Lanka Podujana Peramuna',
          notes: 'Declared 7 August 2024. Son of former president Mahinda Rajapaksa. Election manifesto launched on 2 September 2024.',
          wikipedia: 'https://en.wikipedia.org/wiki/Namal_Rajapaksa',
        },
      ],
  minor: [
    { name: 'Siripala Amarasinghe', party: 'Independent', symbol: 'Tyre', notes: 'Former JVP/UPFA MP for Gampaha. Presidential candidate in 2019.' },
    { name: 'Chaminda Anuruddha', party: 'Independent', symbol: 'Horseshoe' },
    { name: 'P. Ariyanethiran', party: 'Independent', symbol: 'Conch shell', notes: 'Former ITAK/TNA MP for Batticaloa. Endorsed by EPRLF, PLOTE, TELO, Tamil National Party, and TMK.' },
    { name: 'D. M. Bandaranaike', party: 'Independent', symbol: 'Table fan' },
    { name: 'P. W. S. K. Bandaranayake', party: 'National Development Front', symbol: 'Coconut', notes: 'Academic at the University of Peradeniya.' },
    { name: 'Nuwan Bopage', party: 'Socialist People\'s Forum', symbol: 'Umbrella', notes: 'Aragalaya activist. Endorsed by FSP and New Democratic Marxist–Leninist Party.' },
    { name: 'Akmeemana Dayarathana Thero', party: 'Independent', symbol: 'Blackboard', notes: 'Former JHU/UPFA MP for Colombo.' },
    { name: 'Mahinda Dewage', party: 'Socialist Party of Sri Lanka', symbol: 'Balloon' },
    { name: 'Oshala Herath', party: 'New Independent Front', symbol: 'Till', notes: 'Leader of New Independent Front. Former UNP candidate in Colombo.' },
    { name: 'Mohamed Illiyas', party: 'Independent', symbol: 'Syringe', notes: 'Former SLMC MP for Jaffna. Presidential candidate in 2010, 2015, and 2019. Died on 22 August 2024.' },
    { name: 'Abubakar Mohamed Infaz', party: 'Democratic Unity Alliance', symbol: 'Two leaves' },
    { name: 'Sidney Jayarathna', party: 'Independent', symbol: 'Jackfruit', notes: 'Former UNP/UNFGG MP for Polonnaruwa.' },
    { name: 'Siritunga Jayasuriya', party: 'United Socialist Party', symbol: 'Tri-shaw', notes: 'Presidential candidate in 2005, 2010, 2015, and 2019.' },
    { name: 'Dilith Jayaweera', party: 'Communist Party of Sri Lanka', symbol: 'Star', notes: 'Leader of Mawbima Janatha Pakshaya. Endorsed by Sarvajana Balaya. Election manifesto launched on 31 August 2024.' },
    { name: 'Sarath Keerthirathne', party: 'Independent', symbol: 'Football', notes: 'Former Deputy Minister. Former SLFP/PA MP for Gampaha. Presidential candidate in 2019.' },
    { name: 'K. R. Kishan', party: 'Arunalu People\'s Front', symbol: 'Water tap' },
    { name: 'Ananda Kularatne', party: 'Independent', symbol: 'Medal', notes: 'Former Cabinet Minister. Former UNP/UNF MP for Hambantota.' },
    { name: 'A. S. P. Liyanage', party: 'Sri Lanka Labour Party', symbol: 'Kangaroo', notes: 'Presidential candidate in 2010, 2015, and 2019.' },
    { name: 'Sarath Manamendra', party: 'New Sinhala Heritage', symbol: 'Bow and arrow', notes: 'Presidential candidate in 2010, 2015 (endorsed Mahinda Rajapaksa), and 2019.' },
    { name: 'Victor Anthony Perera', party: 'Independent', symbol: 'Motorbike', notes: 'Former SLFP/UPFA MP for Puttalam.' },
    { name: 'K. K. Piyadasa', party: 'Independent', symbol: 'Calculator', notes: 'Former UNP/UNFGG MP for Nuwara Eliya.' },
    { name: 'M. M. Premasiri', party: 'Independent', symbol: 'Pair of spectacles', notes: 'Former JVP/UPFA MP for Matara.' },
    { name: 'Namal Rajapakshe', party: 'Samabima Party', symbol: 'Envelope', notes: 'Not to be confused with SLPP candidate Namal Rajapaksa nor the part of the Rajapaksa family.' },
    { name: 'Roshan Ranasinghe', party: 'Independent', symbol: 'Cricket bat', notes: 'Former Cabinet Minister. SLPP/SLPFA MP for Polonnaruwa.' },
    { name: 'Janaka Ratnayake', party: 'United Lanka People\'s Party', symbol: 'Cup', notes: 'Former chairman of the PUCSL.' },
    { name: 'Battaramulle Seelarathana Thero', party: 'People\'s Welfare Front', symbol: 'Tractor', notes: 'Presidential candidate in 2010, 2015, and 2019.' },
    { name: 'Lalith de Silva', party: 'United National Freedom Front', symbol: 'Comb of plantains' },
    { name: 'Suranjeewa Anoj de Silva', party: 'Democratic United National Front', symbol: 'Eagle' },
    { name: 'M. Thilakarajah', party: 'Independent', symbol: 'Bird feather', notes: 'Former NUW/UNFGG MP for Nuwara Eliya.' },
    { name: 'Keerthi Wickremeratne', party: 'Our People\'s Power Party', symbol: 'Flag' },
    { name: 'Priyantha Wickremesinghe', party: 'Nava Sama Samaja Party', symbol: 'Table' },
    { name: 'Pani Wijesiriwardena', party: 'Socialist Equality Party', symbol: 'Pair of scissors', notes: 'Presidential candidate in 2015 and 2019.' },
    { name: 'Ajantha de Zoyza', party: 'Ruhunu People\'s Party', symbol: 'Pineapple', notes: 'Former SLFP/PA National List MP. Presidential candidate in 2019 (endorsed Sajith Premadasa).' },
  ],
};

const CandidateTable = () => {
  return (
    <div>
      <Heading>Major Candidates</Heading>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Party</TableHeader>
            <TableHeader>Office</TableHeader>
            <TableHeader>Endorsements</TableHeader>
            <TableHeader>Notes</TableHeader>
          </tr>
        </thead>
        <tbody>
        {candidatesData.major.map((candidate, index) => (
    <TableRow key={index}>
      <TableCell>
        <a href={candidate.wikipedia} target="_blank" rel="noopener noreferrer">
          {candidate.name}
        </a>
      </TableCell>
      <TableCell>{candidate.party}</TableCell>
      <TableCell>{candidate.office}</TableCell>
      <TableCell>{candidate.endorsements}</TableCell>
      <TableCell>{candidate.notes}</TableCell>
    </TableRow>
          ))}
        </tbody>
      </Table>

      <Heading>Minor Candidates</Heading>
      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Party</TableHeader>
            <TableHeader>Symbol</TableHeader>
            <TableHeader>Notes</TableHeader>
          </tr>
        </thead>
        <tbody>
          {candidatesData.minor.map((candidate, index) => (
            <TableRow key={index}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.party}</TableCell>
              <TableCell>{candidate.symbol}</TableCell>
              <TableCell>{candidate.notes}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CandidateTable;
