import React from 'react';
import { Grid} from '@mui/material';
import AccountStats from '../Components/Stats/AccountStats';
import MapChart from '../Components/Stats/GeoData';
import Device from '../Components/Stats/Device';
import AreaGraph from '../Components/Stats/NewGraph';
import StatsFilter from '../Components/Stats/Filter';

const Stats = () => {
    return (
        <>
        
        <Grid justifyContent='center' minHeight='100vh' container spacing={1} padding={2} marginTop={'5vh'} >
        <StatsFilter>
        <Grid item xs={12} sm={12} md={10} lg={8.1}>
            <AccountStats />
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={8.1}>
            <Device />
        </Grid>
        <Grid item  xs={12} sm={12} md={10} lg={4} >
            <AreaGraph />
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={4}>
            <MapChart />
        </Grid>
        </StatsFilter>
        </Grid>
        </>

    )
}

export default Stats;