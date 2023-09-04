import React from 'react';
import UrlForm from '../Components/Home/UrlForm';
import {Box} from '@mui/material';
const Home = () =>
{
    const boxStyle = {
        height: '100vh',
        background: 'linear-gradient(to bottom, white 40%, lightgray 60%)',
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