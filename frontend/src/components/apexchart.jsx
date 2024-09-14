import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [props.akd || 0, props.rw || 0, props.sp || 0], // Initialize with props
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
          height: 230,
        }
      },
    };
  }

  componentDidUpdate(prevProps) {
    // Update state when props change
    if (prevProps.akd !== this.props.akd || 
        prevProps.rw !== this.props.rw || 
        prevProps.sp !== this.props.sp) {
      this.setState({
        series: [this.props.akd, this.props.rw, this.props.sp]
      });
    }
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
      </div>
    );
  }
}

export default ApexChart;
