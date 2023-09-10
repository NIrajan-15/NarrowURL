import React, { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import { useStats } from './Filter';

const AccountStats = () => {
    const [totalClicks, setTotalClicks] = useState();
    const [totalUrls, setTotalUrls] = useState();
    const [totalCountries, setTotalCountries] = useState();
    const [totalDevices, setTotalDevices] = useState();

    const fields = ['Total Clicks', 'Total URLs', 'Total Countries', 'Total Devices'];
    const values = [totalClicks, totalUrls, totalCountries, totalDevices];

    const { statsData } = useStats();
    console.log(statsData);

    useEffect(() => {
        setTotalClicks(statsData.clickCount);
        setTotalCountries(statsData.countryCount);
        setTotalDevices(statsData.deviceCount);
        setTotalUrls(statsData.urlCount);
    }, [statsData]);

    return (
        <Box>
        <Grid container spacing={1} marginTop={{xs:'3vh'}} justifyContent="center" marginBottom={{xs:2, sm:2, md:2}} alignItems="center">
            {/* Total URLs Section */}
            {fields.map((field, index) => (
                <Grid item xs={6} sm={3} md={3} lg={3} key={index}>
                <Paper elevation={3} style={{ padding: '1rem',  height:'50px' }}>
                    <Box textAlign="center">
                    <Typography fontSize="2vh" style={{ color: '#000000' }}>
                            {values[index]}
                        </Typography>
                        <Typography  gutterBottom style={{ color: '#777777' }}>
                            {field} 
                        </Typography>
                        
                    </Box>
                </Paper>
            </Grid>
            ))}
            
        </Grid>
        </Box>
    );
};

export default AccountStats;
