import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [0, 0, 0], // Initialize with default values
      options: {
        chart: {
          width: 380,
          type: 'donut',
        },
        labels: ['AKD', 'RW', 'SP'], // Labels for the sections
        colors: ['#C62828', '#2C6B2F', '#FBC02D'], // Darker red, green, yellow
        dataLabels: {
          enabled: false
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
          position: 'right',
          offsetY: 0,
          height: 230
        }
      }
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
      console.log('AKD:', data['Anura Kumara Dissanayake']);
      this.setState({
        series: [data['Anura Kumara Dissanayake'], data['Ranil Wickramasinghe'], data['Sajith Premadasa']] // Use actual values from the response
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
        type="donut"
        width="500"
      />
    );
  }
}

export default ApexChart;
