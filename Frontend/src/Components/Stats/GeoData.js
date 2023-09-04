import React from "react";
import Paper from "@mui/material/Paper";
import { Chart } from "react-google-charts";
import { Typography } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const data = [
  ["Country", "Clicks"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["France", 600],
  ["RU", 700],
  ["Nepal", 650],
];

function MapChart() {
  // Define a callback function for the "select" event
  const handleSelect = ({ chartWrapper }) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;
    const region = data[selection[0].row + 1];
    console.log("Selected : " + region);
  };

  return (
    <>
    <Paper elevation={3}>
        <Typography variant="h6" gutterBottom textAlign={'center'} padding={2.5}>
            Your Links were clicked here 
        </Typography>
    </Paper>
    
    <Paper elevation={3}>
    <Chart
      chartType="GeoChart"
      width="100%"
      height="380px"
      data={data}
      chartEvents={[
        {
          eventName: "select",
          callback: handleSelect,
        },
      ]}
      
    />
    </Paper>
    </>
  );
}

export default MapChart;
