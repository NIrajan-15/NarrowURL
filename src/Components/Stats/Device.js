import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import LaptopChromebookTwoToneIcon from '@mui/icons-material/LaptopChromebookTwoTone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { useStats } from './Filter';


const iconMapping = {  
  Mobile: <PhoneAndroidIcon sx={{ fontSize: '3vh', color: '#eb9e34', paddingTop:'6vh', paddingBottom:'2vh'}} />,
  Tablet: <TabletMacIcon sx={{ fontSize: '7vh', color: '#34ebba', paddingTop:'3vh' ,paddingBottom:'2vh',paddingLeft:'-8vw' }} />,
  Laptop: <LaptopChromebookTwoToneIcon sx={{ fontSize: '10vh', paddingTop:'2vh' , color: '#d95f74', marginTop:'-1vh' }} />,
  Desktop: <DesktopWindowsIcon sx={{ fontSize: '10vh', paddingTop:'2vh' , color: 'lightblue', marginTop:'-1vh' }} />,
};

const Device = () => {
  
  const statsData = useStats();
  
  return (
    <>
      <Paper elevation={0}>
        <Grid p={1} paddingTop={{xs:5, sm:3, md:3, lg:3 }} paddingBottom={{xs:3,sm:3, md:2, lg:3}} container spacing={2} justifyContent={'center'}>
          {statsData.statsData.deviceCountData?.map(([name,value]) => (
            <Grid key={name} item xs={3}  marginTop={'-1vh'} sx={{borderStyle:'inset',borderWidth:'0.05px'}}>
              <Typography textAlign={'center'}>
                {iconMapping[name]}
                <br />
               {name}<br /> {value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default Device;
