import React from 'react';
import { Box, Typography, Paper, Grid, Container, Button } from '@mui/material';
import UrlForm from '../Home/UrlForm';
import { FaMapMarker } from 'react-icons/fa'; // Import icons as needed
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SaveIcon from '@mui/icons-material/Save';

const FirstPage = () => {
  
  return (
    <Container>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12} sm={10} md={10} lg={12}>
          <Paper elevation={0} sx={{ paddingBottom: '10vh', borderRadius: '0px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <UrlForm />
            </Box>
            
          </Paper>
        </Grid>
      </Grid>
      {/* Display grid with 3 boxes */}
      <Typography fontSize={'1.5rem'} width={'100%'} textAlign={'center'} paddingBottom={'40px'}>            Want More Features?
        </Typography>
      <Grid container spacing={3} justifyContent={'center'}>
        
        <Grid item xs={4} sm={4}>
          <Box textAlign="center">
            <SaveIcon sx={{fontSize:'5vh', color:"green"}}  />
            <Typography variant="h6" sx={{ marginTop: '1rem' }}>
              Store
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Box textAlign="center">
            <QueryStatsIcon sx={{fontSize:'5vh'}} color="orange" />
            <Typography variant="h6" sx={{ marginTop: '1rem' }}>
              Stats
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4} sm={4}>
          <Box textAlign="center">
            <FaMapMarker size={48} color="lightblue" />
            <Typography variant="h6" sx={{ marginTop: '1rem' }}>
              Trace
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FirstPage;
