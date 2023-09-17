import React, { useState, useContext, createContext, useEffect } from 'react';
import { Grid, Box, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';



const urlContext = createContext();

export function useUrls() {
  return useContext(urlContext);
}


const StatsContext = createContext();

export function useStats() {
  return useContext(StatsContext);
}


const StatsFilter = ({ children }) => {

  const userData = Array.from(JSON.parse(localStorage.getItem('userData'))) || [];

  const dateOptions = ['1m', '6m', 'ytd', 'All'];
  const [selectedTime, setSelectedTime] = useState('All');
  const [selectedURL, setSelectedURL] = useState('All');
  
  const [statsData, setStatsData] = useState([]);
  const [urlOptions, setUrlOptions] = useState([]);
  const [activeButton, setActiveButton] = useState('All');
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const createStatData = (param) => {
    const clickDateData = new Map([]);
    const urls = new Set();
    const urlsObjects = new Set();
    const countryCountData = new Map([['Country', 'Clicks']]);
    const deviceCountData = new Map([['Laptop',0],['Mobile',0],['Tablet',0],['Desktop',0]]);
    
    param.forEach((click) => {
      
      countryCountData.set(click.country, (countryCountData.get(click.country) || 0) + 1);
      // Count occurrences of devices
      deviceCountData.set(click.device, (deviceCountData.get(click.device) || 0) + 1);
      // Count occurrences of dates
      clickDateData.set(click.date, (clickDateData.get(click.date) || 0) + 1);
      // Add URLs to the set
      if(!urlsObjects.has(click)) urlsObjects.add({name: click.name, longUrl: click.longUrl, shortUrl: click.shortUrl});
      urls.add(click.name);
    });

    setStatsData({
      countryCount: new Set((countryCountData).keys()).size,
      deviceCount: new Set((new Map(
        [...deviceCountData].filter(([key, value]) => value !== 0)
      )).keys()).size, 
      clickCount: param.length,
      urlCount: urls.size,
      clickDateData: Array.from(clickDateData).sort(),
      countryCountData: Array.from(countryCountData),
      deviceCountData: Array.from(deviceCountData),
      urls: urls,
    });

    localStorage.setItem('urls', Array.from(urlsObjects));
  };

  const createUrlOptions = () => {
    const urls = new Set(userData.map(click => click.name));
    urls.add('All');
    setUrlOptions([...urls]);
    
  };

  const handleWindowSizeChange = () => {
    setScreenSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {

    const date = new Date();
    let month = date.getMonth();
    const time = Math.floor(new Date(date).getTime());

    let filteredData = userData;

    
    if (selectedURL !== 'All') {
      filteredData = filteredData.filter((click) => click.name === selectedURL);
    }
    if (selectedTime !== 'All') {

      if (selectedTime === '1m')  month = 1;
      else if (selectedTime === '6m') month = 6;
      const timeThreshold = time - month * 2629800000;
      filteredData = filteredData.filter((click) => click.date >= timeThreshold);
    }
    createStatData(filteredData);
    createUrlOptions();
  }, [selectedTime, selectedURL]);

  return (
    <StatsContext.Provider value={{ statsData, setStatsData }}>
      <Box height='4vh' p={1} width='100%' marginTop={{ xs: '5vh', sm: '5vh' }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={1} paddingTop={'2vh'}>
            <TuneIcon sx={{ marginTop: '1.5vh' }} />
          </Grid>

          <Grid item xs={5} sm={4} md={3} lg={2} textAlign={'center'}>
            <FormControl fullWidth>
              <InputLabel id="select-url-label">Filter by URL</InputLabel>
              <Select
                labelId="select-url-label"
                id="select-url"
                value={selectedURL}
                onChange={(e) => setSelectedURL(e.target.value)}
              >
                {urlOptions.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          
            {screenSize >= 600 ? ( // Render buttons for screens wider than or equal to 600px
              dateOptions.map((duration, index) => (
                <Grid key={index} item xs={5} sm={1.5} md={1.5} lg={1} textAlign={'center'}>
                <Button
                  key={index}
                  variant={activeButton === duration ? 'contained' : 'outlined'}
                  onClick={() => {
                    setSelectedTime(duration);
                    setActiveButton(duration);
                  }}
                  fullWidth
                  value={duration}
                  style={{ borderRadius: 16, marginTop: '1vh' }}
                >
                  {duration}
                </Button>
                </Grid>
              ))
            ) : ( // Render Select component for screens narrower than 600px
              <Grid item xs={5} sm={2}  md={3} lg={2} textAlign={'center'}>
              <FormControl fullWidth>
                <InputLabel id="select-time-label">Select Time</InputLabel>
                <Select
                  labelId="select-time-label"
                  id="select-time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  {dateOptions.map((duration, index) => (
                    <MenuItem key={index} value={duration}>
                      {duration}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
            )}

        </Grid>
      </Box>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsFilter;

