import React from "react";
import Paper from "@mui/material/Paper";
import { Chart } from "react-google-charts";
import { Typography } from "@mui/material";
import { useStats } from "./Filter";


function MapChart() {

  const statData = useStats();
  
  const data = statData.statsData.countryCountData;
  

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
        <Typography variant="h6" gutterBottom textAlign={'center'} padding={0.5}>
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