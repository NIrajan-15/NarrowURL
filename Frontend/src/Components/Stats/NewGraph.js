import React, { useState } from 'react';
import { Button, Box, Paper, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';

const AreaGraph = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [
            [1630425600000, 5],
            [1630512000000, 6],
            [1630512000000, 6],
            [1630598400000, 1],
            [1630684800000, 1],
            [1630771200000, 1],
            [1630857600000, 1],
            [1630944000000, 1],
            [1631548800000, 1],
            [1631721600000, 1],
        ]
      },
    ],
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        // Your annotations here
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        min: new Date('01 Sep 2022').getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    },
    
  });

  const updateData = (timeline) => {
    
    const current_date = new Date();
    console.log(current_date.getMonth()-timeline);
    if(timeline === '1')
    {
        ApexCharts.exec(
        'area-datetime',
        'zoomX',
        new Date(current_date.getMonth()-1).getTime(),
        current_date.getTime()
        );
    }
    else{
        ApexCharts.exec(
            'area-datetime',
            'zoomX',
            new Date(current_date.getMonth()-timeline).getTime(),
            current_date.getTime()
            );
    }
    
  }

  
  return (
    <Box id="chart">
      <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="3vh" marginBottom={3} gutterBottom color="Purple">URL Clicks</Typography>
        <Box display="flex" justifyContent="center"  flexDirection="column">
          <div className="toolbar">

            
            <Button
              id="one_month"
              onClick={() => updateData('1')}
              className={chartData.selection === 'one_month' ? 'active' : ''}
            >
              1M
            </Button>
            <Button
              id="six_months"
              onClick={() => updateData('6')}
              className={chartData.selection === 'six_months' ? 'active' : ''}
            >
              6M
            </Button>
            <Button
              id="one_year"
              onClick={() => updateData('12')}
              className={chartData.selection === 'one_year' ? 'active' : ''}
            >
              1Y
            </Button>
            <Button
              id="ytd"
              onClick={() => updateData('0')}
              className={chartData.selection === 'ytd' ? 'active' : ''}
            >
              YTD
            </Button>
            <Button
              id="all"
              onClick={() => updateData('1')}
              className={chartData.selection === 'all' ? 'active' : ''}
            >
              ALL
            </Button>
          </div>

          <div id="chart-timeline">
            <ReactApexChart options={chartData.options} series={chartData.series} type="area" color='#d95f74' height={350} />
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default AreaGraph;
