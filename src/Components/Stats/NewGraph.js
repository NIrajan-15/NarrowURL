import React from 'react';
import {  Box, Paper, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useStats } from './Filter';

const AreaGraph = () => {

  const statData = useStats();

  const data = statData.statsData?.clickDateData?.map(([key,value]) => {
    return {
      x: key,
      y: value,
      }
  });

  console.log(data);

  const chartData = {
    series: [
      {
        name: 'Clicks',
        data: data,
      },
    ],
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        
        
        toolbar: {
          autoSelected: 'pan',
        },
        
      },
      
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        show: true,
        tickAmount: 3,
        min: 0,
      },
      
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },   
      
    },
    
  };

  return (
    <Box id="chart">
      <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="3vh" marginBottom={3} gutterBottom color="Purple">URL Clicks</Typography>
        <Box display="flex" justifyContent="center"  flexDirection="column">
          <div id="chart-timeline">
            <ReactApexChart options={chartData.options} series={chartData.series} type="area" color='#d95f74' height={350} />
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default AreaGraph;
