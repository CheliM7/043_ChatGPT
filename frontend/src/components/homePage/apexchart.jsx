import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Candidates',
        data: [0, 0, 0], // Initialize with default values
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        // Define colors for each bar
        colors: ['#90EE90', '#2C6B2F', '#FBC02D'], // Use the same colors
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: ['AKD', 'RW', 'SP'], // Labels for the x-axis
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center',
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        }],
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
      this.setState({
        series: [{
          name: 'Candidates',
          data: [
            data['Anura Kumara Dissanayake'], 
            data['Ranil Wickramasinghe'], 
            data['Sajith Premadasa']
          ] // Use actual values from the response
        }]
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
        type="bar"
        height={450}
        width={600}
      />
    );
  }
}

export default ApexChart;
