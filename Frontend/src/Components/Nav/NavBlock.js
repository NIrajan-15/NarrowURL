import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
      <>
        <AppBar position="fixed" style={{ height: '10vh' }}>
            <Toolbar style={{ height: '100%' }}>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    {/* App Name */}
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            NarrowURL 
                        </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton component={Link} to="/" style={{ color: '#ffffff' }}>
                          <HomeIcon /> Home
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton component={Link} to="/stats" style={{ color: '#ffffff' }}>
                          <BarChartIcon /> Stats
                      </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
        <Grid container >
          
        </Grid>
      </>
    );
};

export default Navigation;
