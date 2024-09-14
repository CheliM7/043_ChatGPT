import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [45, 35, 15, 5], // Default values
      options: {
        chart: {
          width: 380,
          type: 'donut',
        },
        labels: ['AKD', 'RW', 'SP', 'OTHER'], // Labels for the sections
        colors: ['#C62828', '#2C6B2F', '#FBC02D', 'rgba(0, 0, 0, 0.5)'], // Darker red, green, yellow, transparent black
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
          height: 230,
        }
      },
      
      
    };
  }

  appendData() {
    const arr = [...this.state.series];
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);

    this.setState({
      series: arr
    });
  }

  removeData() {
    if (this.state.series.length === 1) return;

    const arr = [...this.state.series];
    arr.pop();

    this.setState({
      series: arr
    });
  }

  randomize() {
    this.setState({
      series: this.state.series.map(() => Math.floor(Math.random() * (100 - 1 + 1)) + 1)
    });
  }

  reset() {
    this.setState({
      series: [45, 35, 15, 5]
    });
  }

  render() {
    return (
      <div>
        <div>
          <div className="chart-wrap">
            <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={420} />
            </div>
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
