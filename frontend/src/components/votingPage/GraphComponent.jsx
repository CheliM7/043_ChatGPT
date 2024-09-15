import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import styled from 'styled-components';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  height: 450px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9; /* Light background color */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GraphComponent = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Votes',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.4)', // Light green color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch voting results
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/polling/candidates'); 
        const result = await response.json();

        // Log the raw result
        console.log('Raw result:', result);

        // Check if 'data' exists and is an array
        const results = Array.isArray(result) ? result : [];

        // Process and set data
        const labels = results.map(item => item.name);
        const votes = results.map(item => item.vote_count);

        // Log processed labels and votes
        console.log('Labels:', labels);
        console.log('Votes:', votes);

        setData({
          labels,
          datasets: [
            {
              label: 'Votes',
              data: votes,
              backgroundColor: 'rgba(75, 192, 192, 0.4)', // Light green color
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14,
                  weight: 'normal', // Minimalist font weight
                },
                color: '#333', // Dark text color for contrast
              },
            },
            title: {
              display: true,
              text: 'Votes per Candidate',
              font: {
                size: 16,
                weight: 'normal',
                family: 'Arial, sans-serif',
              },
              color: '#333', // Dark text color for contrast
            },
            tooltip: {
              backgroundColor: '#fff', // Light background for tooltips
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: '#ddd',
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#333', // Dark text color for x-axis
                font: {
                  size: 12,
                },
              },
              grid: {
                color: '#eee', // Light grid lines
              },
            },
            y: {
              ticks: {
                color: '#333', // Dark text color for y-axis
                font: {
                  size: 12,
                },
              },
              grid: {
                color: '#eee', // Light grid lines
              },
            },
          },
        }}
      />
    </Container>
  );
};

export default GraphComponent;
