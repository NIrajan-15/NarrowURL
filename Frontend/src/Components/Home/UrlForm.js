import React,{useContext} from 'react';
import { Box, Paper, Grid, TextField, Button } from '@mui/material';
import { AuthContext } from '../Authentication/Auth';
const UrlForm = () => {
    const { currentUser } = React.useContext(AuthContext);
    return (
        
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh', // Change to 100vh to center vertically on the entire screen
            }}
        >
            
            <Paper elevation={3} style={{ padding: '2%', width: '80%', maxWidth: '950px' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Enter the URL here"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={12}>
                        <Button variant="contained" fullWidth>
                            Narrow URL
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default UrlForm;
