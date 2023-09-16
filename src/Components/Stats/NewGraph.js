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

  const chartData = {
    series: [
      {
        data: data,
      },
    ],
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        zoomX: {
          enabled: true,
          autoScaleYaxis: true,
        },
        
        toolbar: {
          autoSelected: 'zoom',
        },
        stroke: {
          curve: 'smooth',
        },
      },
      annotations: {
        
      },
      dataLabels: {
        enabled: true,
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        min: 0,
        max: 10,
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
            <ReactApexChart options={chartData.options} series={chartData.series} type="line" color='#d95f74' height={350} />
          </div>
        </Box>
      </Paper>
    </Box>
  );
};

export default AreaGraph;
