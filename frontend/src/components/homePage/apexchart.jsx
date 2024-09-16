import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [0, 0, 0], // Initialize with default values for pie chart
      options: {
        chart: {
          type: 'pie',
          height: 350,
        },
        labels: ['AKD', 'RW', 'SP'], // Labels for the pie chart
        colors: ['#C62828', '#43A047', '#F4C300'], // Colors for the segments
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              height: 300,
            },
          },
        }],
        legend: {
          position: 'bottom', // Positioning of the legend
        },
      },
    };
  }

  componentDidMount() {
    // Fetch data here
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/WinPrediction');
      const data = await response.json();
      console.log('Fetched data:', data);
      this.setState({
        series: [
          data['Anura Kumara Dissanayake'],
          data['Ranil Wickramasinghe'],
          data['Sajith Premadasa'],
        ], // Use actual values from the response
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  render() {
    const { series, options } = this.state;

    return (
      <ReactApexChart
        options={options}
        series={series}
        type="pie" // Change type to "pie"
        height={350}
      />
    );
  }
}

export default ApexChart;