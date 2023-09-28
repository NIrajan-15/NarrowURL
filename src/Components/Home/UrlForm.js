import React, { useState, useContext } from 'react';
import {  Paper, Grid, TextField, Button, Typography, Box } from '@mui/material';
import { AuthContext } from '../Authentication/Auth';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import validator from 'validator';
import UrlResult from './UrlResult';

const UrlForm = () => {
  // Access the current user from the authentication context
  const { currentUser } = useContext(AuthContext);
  const[urlMessage, setUrlMessage] = useState('');
  // State variables for the component
  const [message, setMessage] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [urlName, setUrlName] = useState('');
  const [validUrl, setValidUrl] = useState(true);
  const [shortlink, setShortlink] = useState('');
  const[error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  // Function to handle URL validation
  const handleValidate = (url) => {
    setMessage(''); // Clear any previous messages
    setInputUrl(url); // Set the input URL
    // If the URL is empty, exit validation
    if (url.length === 0) return;

    // Check if the URL is valid using the validator library
    if (!validator.isURL(url)) {
      setMessage('Invalid URL');
      setValidUrl(false);
      return;
    }
    // URL is valid; set the flag
    setValidUrl(true);
    setMessage('Valid');
    setError(false);

    // If the URL doesn't start with 'https://', add it
    if (!url.startsWith('https://')) {
      url = 'https://' + url;
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    setLoading(true);
    let useremail = '';
    
    if(currentUser){
      useremail = currentUser.email;
    }
    // api endpoint to save data when a short link is created
    const api_url = process.env.REACT_APP_ADD_URL_API;
    const data = fetch(api_url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "longUrl": inputUrl,
        "name": urlName,
        "useremail": useremail
      }),
    })
    .then(res => res.json())
    .then(data => {
      setShortlink(data.shortUrl);
      setUrlMessage(data.message);
      setLoading(false);
    }
    )

  };

  // render the shortlink section when a shortlink is generated
  const renderShortlinkSection = () => {
    if (!shortlink) return null;

    return <UrlResult shortlink={ [shortlink,urlMessage] } />;
  };

  return (
    <>
    <Box height='100%'>

    </Box>
    <Paper elevation={1} style={{ padding: '2%', width:'80%',maxWidth: '760px' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
    
      <Grid item xs={12}>
          {currentUser && (
            <TextField
              id="outlined-basic"
              label="Enter a name for your URL"
              variant="outlined"
              fullWidth
              onChange={(e) => setUrlName(e.target.value)}
            />
            )}
          </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Enter your Link here"
            variant="outlined"
            fullWidth
            onChange={(e) => handleValidate(e.target.value)}
          />
          {message && (
            <Typography width="100%" textAlign="center" p={2}>
              {validUrl ? (
                <DoneOutlineIcon color="success" />
              ) : (
                <>
                  <ErrorIcon color="error" /> {message}
                </>
              )}
            </Typography>
          )}
          {loading && (
            <Typography width="100%" textAlign="center" p={2}>
              Loading...
            </Typography>
          )
          }
          
        </Grid>
        {renderShortlinkSection()}
        <Grid item xs={12} md={6}>
          {!shortlink && (
            <Button variant="contained" type="submit" disabled={error} fullWidth onClick={handleSubmit}>
              Narrow URL
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
    </>
  );
};

export default UrlForm;
