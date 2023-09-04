import React,{useState} from 'react';
import { Box, Paper, Grid, TextField, Button, Typography } from '@mui/material';
import { AuthContext } from '../Authentication/Auth';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import  validator  from 'validator';

const UrlForm = (e) => {
    const { currentUser } = React.useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [urlName, setUrlName] = useState('');
    const [validUrl, setValidUrl] = useState(true);
    

    const handleValidate = async (url) => {

        if(url.length === 0) {
            setMessage('');
            return;
        }
        
        if (!(validator.isURL(url))) {
            setMessage('Invalid URL');
            setValidUrl(false);
            return;
          }
            setMessage('valid');
            setValidUrl(true);
      
          // Step 2: Check if it's an HTTPS URL
          if (!url.startsWith('https://')) {
            url = 'https://' + url;
          }

        };

        const handleSubmit=(e) => {
            e.preventDefault();
            
    }

        
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                width: '100vw',
            }}
        >
            
            <Paper elevation={1} style={{ padding: '2%', width: '80%'}}>
            
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                
                <Grid item xs={12} md={12} >
                        <TextField
                            id="outlined-basic"
                            label="Enter a name for your URL"
                            variant="outlined"
                            fullWidth
                            onChange={(e)=>setUrlName(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Enter the URL here"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => handleValidate(e.target.value)}
                            
                        />
                        <Typography width='100%' textAlign={'center'} p={2}>
                            
                            {message && 
                                <>
                                    {validUrl ? <DoneOutlineIcon color="success" />
                                    :
                                    <>
                                    <ErrorIcon color="error"/> {message}
                                    
                                    </>
                                    }
                                </>
                            }
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" fullWidth>
                            Narrow URL
                        </Button>
                    </Grid>
                    
                </Grid>

                {/* Simple Instructions */}
                
            </Paper>
        </Box>
    );
};

export default UrlForm;
