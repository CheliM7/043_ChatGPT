// PublicPolls.jsx
import React from 'react';
import styled from 'styled-components';
import poll_1 from '../../assets/poll_1.jpeg';
import poll_2 from '../../assets/poll_2.jpeg';
import poll_3 from '../../assets/poll_3.jpg';

const PollsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: #0000;
`;

const Heading = styled.h1`
  font-size: 26px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;
`;

const PollTile = styled.div`
  width: 80%;
  max-width: 1000px;
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const PollContent = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const PollImage = styled.img`
  width: 150px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #e0e0e0;
`;

const PollTitle = styled.h2`
  font-size: 26px;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 700;
`;

const PollDetails = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0 0 16px 0;
`;

const Button = styled.a`
  background: #4a1f1a;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  text-transform: uppercase;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background: #3e1613;
    transform: scale(1.05);
  }
`;

const PublicPolls = () => {
  const polls = [
    { 
      title: 'Helakuru Digital Poll', 
      details: 'According to the survey results, presidential candidates received the following percentages of support: Anura Kumara Dissanayake 85.1%, Ranil Wickremesinghe 7.5%, and Sajith Premadasa 3.8%. Conducted from August 8th to 14th, the survey saw 25,777 smartphone users across the country voluntarily participating. The report also highlights that 90% of the participants were Sinhala individuals under the age of 45, suggesting that the survey results may reflect a stronger bias towards the voting preferences of this age group and demographic',
      image: poll_2,
      link: 'https://www.helakuru.lk/esana/news/104817'
    },
    { 
      title: 'IHP MRP Presidential Election', 
      details: 'IHP’s Sri Lanka Opinion Tracker Survey (SLOTS) MRP provisional estimates of Presidential Election voting intent for August 2024 show NPP/JVP leader AK Dissanayake and SJB leader Sajith Premadasa led in voting preferences of all adults ahead of the September Presidential Election. None of the four major party presidential candidates had support of a majority of the adult voters. NPP/JVP leader AK Dissanayake led with 36% of all adults, followed by SJB leader Sajith Premadasa with 32%, Pres. Ranil Wickremesinghe with 28% and Namal Rajapaksa with 3%. Estimates are associated with margins of error of 3–7%.',
      image: poll_1,
      link: 'https://www.ihp.lk/press-releases/ak-dissanayake-and-sajith-premadasa-led-august-voting-intent-amongst-all-adults'
    },
    { 
      title: 'Numbers.lk 2nd pre election poll', 
      details: 'In the second pre election poll conducted by Numbers.lk, Anura Kumara Dissanayake (AKD) emerges as the frontrunner in Sri Lanka’s upcoming presidential election, with incumbent President Ranil Wickremesinghe making significant gains compare to the April, pushing Sajith Premadasa to third place. The poll, conducted online from August 9th to 23rd, surveyed 3,900 adults across all 22 electoral districts and has a margin of error of +/- 3.0%.',
      image: poll_3,
      link: 'https://numbers.lk/analysis/akd-maintains-lead-in-numbers-lk-s-2nd-pre-election-poll-ranil-surges-to-second-place'
    }
  ];

  return (
    <PollsContainer>
      <Heading>Currently Available Public Polls</Heading>
      {polls.map((poll, index) => (
        <PollTile key={index}>
          <PollContent>
            <PollTitle>{poll.title}</PollTitle>
            <PollDetails>{poll.details}</PollDetails>
            <Button href={poll.link} target="_blank" rel="noopener noreferrer">View Poll</Button>
          </PollContent>
          <PollImage src={poll.image} alt={`Image for ${poll.title}`} />
        </PollTile>
      ))}
    </PollsContainer>
  );
};

export default PublicPolls;
