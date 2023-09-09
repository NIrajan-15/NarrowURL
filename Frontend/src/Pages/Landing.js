import React from 'react';
import Signup from '../Components/Authentication/Signup';
import { Grid, Box } from '@mui/material';
import LandingAnimation from '../Components/Landing Page/LandingAnimation';
import UrlForm from '../Components/Home/UrlForm';
import Navigation from '../Components/Nav/NavBlock';

const LandingPage = () => {
    return(
        <>
        <Navigation />
        <Box  padding={2}>
        <Grid container>

        <Grid item sm={6} lg={6}>
            <UrlForm />
        </Grid>
        
        <Grid item sm={6} lg={6}>
            <Signup />
        </Grid>
            
        </Grid>
        </Box>
        </>
    )
    
}

export default LandingPage;