import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';  // Automatically imports Chart.js modules for you
import styled from 'styled-components';
import axios from 'axios';

// Styling for the chart container
const ChartContainer = styled.div`
  width: 80%;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f9fafb;  // Light background color
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 400px;  // Increased height for the chart
`;

// Chart component
const HorizontalBarChart = () => {
  const [chartData, setChartData] = useState(null);

  // Fetch data from the API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/sentiment/total_positive');
        const data = response.data;

        // Prepare the chart data
        const labels = ['Anura Kumara Dissanayake', 'Sajith Premadasa', 'Ranil Wickramasinghe'];
        const values = [
          data['Anura Kumara Dissanayake'],
          data['Sajith Premadasa'],
          data['Ranil Wickramasinghe'],
        ];

        setChartData({
            labels,
            datasets: [
              {
                label: 'Positive Sentiment',
                data: values,
                backgroundColor: [
                  '#C62828',  // Dark Red
                  '#FBC02D',  // Yellow
                  '#2C6B2F'   // Dark Green
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                  'rgba(198, 40, 40, 0.5)',  // Lighter Red
                  'rgba(251, 192, 45, 0.5)', // Lighter Yellow
                  'rgba(44, 107, 47, 0.5)'   // Lighter Green
                ],
                hoverBorderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)'
                ],
                barThickness: 60
              }
            ]
          });
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    fetchData();
  }, []);

  // Render the chart once the data is available
  return (
    <ChartContainer>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            indexAxis: 'y',  // Make it a horizontal bar chart
            plugins: {
              legend: { display: false },  // Hide the legend for minimalistic look
            },
            scales: {
              x: {
                ticks: {
                  color: '#000',  // Dark text for ticks
                },
                grid: {
                  color: '#e5e7eb',  // Light grid lines
                },
              },
              y: {
                ticks: {
                  color: '#000',  // Dark text for labels
                },
                grid: {
                  color: '#e5e7eb',  // Light grid lines
                },
              }
            },
            responsive: true,
            maintainAspectRatio: false,  // Allows chart to adjust its height
          }}
        />
      ) : (
        <p style={{ color: '#000', textAlign: 'center' }}>Loading chart...</p>
      )}
    </ChartContainer>
  );
};

export default HorizontalBarChart;