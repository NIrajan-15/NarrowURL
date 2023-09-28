import React from 'react';
import UrlForm from '../Components/Home/UrlForm';
import {Box} from '@mui/material';
const Home = () =>
{
    
    return(
        <>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '111vh',
        }}
    >
        <UrlForm />
        </Box>
            
        </>
    )
}

export default Home;