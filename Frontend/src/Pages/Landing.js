import React from 'react';
import Signup from '../Components/Authentication/Signup';
import { Grid, Box } from '@mui/material';
import LandingAnimation from '../Components/Landing Page/LandingAnimation';

const LandingPage = () => {
    return(
        <>
        <Box  padding={2}>
        <Grid container>
        
        <Grid item sm={12} lg={12}>
            <Signup />
        </Grid>
            
        </Grid>
        </Box>
        </>
    )
    
}

export default LandingPage;