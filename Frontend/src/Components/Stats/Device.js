import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import LaptopChromebookTwoToneIcon from '@mui/icons-material/LaptopChromebookTwoTone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AiOutlineLaptop from 'react-icons/ai';

const DeviceData = [
{
    name: 'Mobile',
    value: 220,
    },
  {
    name: 'Tablet',
    value: 220,
  },
  {
    name: 'Laptop',
    value: 220,
  },
  
];

const iconMapping = {  
  Mobile: <PhoneAndroidIcon sx={{ fontSize: '6vh', color: '#eb9e34', paddingTop:'6vh', paddingBottom:'2vh'}} />,
  Tablet: <TabletMacIcon sx={{ fontSize: '9vh', color: '#34ebba', paddingTop:'3vh' ,paddingBottom:'2vh',paddingLeft:'-8vw' }} />,
  Laptop: <LaptopChromebookTwoToneIcon sx={{ fontSize: '13vh', paddingTop:'2vh' , color: '#d95f74', marginTop:'-1vh' }} />,

};

const Device = () => {
  return (
    <>
      <Paper elevation={0}>
        <Grid p={1} paddingTop={{xs:10, sm:5, md:7, lg:3 }} paddingBottom={{xs:5,sm:3, md:5, lg:0}} container spacing={2} justifyContent={'center'}>
          {DeviceData.map((device, index) => (
            <Grid key={index} item xs={4} marginTop={'-1vh'} sx={{borderStyle:'inset',borderWidth:'0.05px'}}>
              <Typography textAlign={'center'}>
                {iconMapping[device.name]}
                <br />
               {device.name}<br /> {device.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Device;
