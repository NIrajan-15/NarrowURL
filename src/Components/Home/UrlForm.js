import React, { useState, useContext } from 'react';
import {  Paper, Grid, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../Authentication/Auth';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import validator from 'validator';
import UrlResult from './UrlResult';

const UrlForm = () => {
  // Access the current user from the authentication context
  const { currentUser } = useContext(AuthContext);

  // State variables for the component
  const [message, setMessage] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [urlName, setUrlName] = useState('');
  const [validUrl, setValidUrl] = useState(true);
  const [shortlink, setShortlink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const[error, setError] = useState(true);

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
    // Generate a random shortlink
    const short =
      Math.random().toString(36).substring(2, 5) +
      Math.random().toString(36).substring(2, 5);

    // Set the shortlink
    setShortlink('narrow-url.io/' + short);

    // Reset copied state and clear any previous message
    setIsCopied(false);
    setMessage('');
  };

  const renderShortlinkSection = () => {
    if (!shortlink) return null;

    return <UrlResult shortlink={shortlink} />;
  };

  return (
    <Paper elevation={1} style={{ padding: '2%', width: '95%', maxWidth: '800px' }}>
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
  );
};

export default UrlForm;
