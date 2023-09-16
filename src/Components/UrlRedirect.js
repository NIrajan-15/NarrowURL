import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import image404 from '../Images/404 page.gif';
import Navigation from '../Components/Nav/NavBlock';

const UrlRedirect = () => {
  // Extract the desired part of the URL using useParams
  const { shortUrl } = useParams();
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Determine the device type based on the screen width
  const screenWidth = window.innerWidth;
  let deviceType = '';
  if (screenWidth <= 420) deviceType = 'Mobile';
  else if (screenWidth <= 1024) deviceType = 'Tablet';
  else if (screenWidth <= 1366) deviceType = 'Laptop';
  else deviceType = 'Desktop';
  
  // Initialize the URL data state
  const [urlData, setUrlData] = useState({
    shortUrl: shortUrl,
    country: '',
    date: Math.floor(new Date().getTime()),
    device: deviceType,
  });


  const backgroundImageStyle = {
    backgroundColor: '#ffffff',
    width: '100%', // Full width of the screen
    height: '111vh', // Full height of the viewport
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Center content vertically and horizontally

  };

  
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://ipinfo.io/json?token=${process.env.REACT_APP_LOCATION_API_TOKEN}`);
        const data = await response.json();
        const updatedUrlData = { ...urlData, country: data.country };
        setUrlData(updatedUrlData);
  
        const postResponse = await fetch('https://oaem8s8cz8.execute-api.us-east-1.amazonaws.com/Dev/urlclicks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUrlData),
        });
  
        const postData = await postResponse.json();
        setMessage(postData.message);
        console.log(updatedUrlData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchCountry();
  }, []);
  
  

  return (
    <>
    <Navigation />
    <Box style={backgroundImageStyle} >
    {message === 'Not Found' ? (
      <>
      <h1> 404 Page not found !</h1>
      <Button
        variant='outlined'
        color='primary'
        href='/'  
      >
        Go to Home
      </Button>
      </>):
      (
      <>
      <h1>Redirecting...</h1>
      
      </>
      )

    }
    </Box>
    </>
  );
};

export default UrlRedirect;
