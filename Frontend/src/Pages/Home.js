import React from 'react';
import UrlForm from '../Components/Home/UrlForm';
import {Box} from '@mui/material';
const Home = () =>
{
    const boxStyle = {
        height: '100vh',
       
      };
    return(
        <>
        <Box style={boxStyle}>
        <UrlForm />
        </Box>
            
        </>
    )
}

export default Home;