import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
} from '@mui/material';

const AccountStats = () => {
    const [totalClicks, setTotalClicks] = useState(1234);
    const [totalUrls, setTotalUrls] = useState(210);

    return (
        <Grid container spacing={3} padding={{xs:0,sm:2,md:6,lg:6}} justifyContent="center" alignItems="center" style={{ minHeight: '20vh', marginTop:'5vh' }}>
            {/* Total URLs Section */}
            <Grid item xs={8} md={5} lg={3}>
                <Paper elevation={3} style={{ padding: '1rem', background: '#ffffff' }}>
                    <Box textAlign="center">
                        <Typography  gutterBottom style={{ color: '#777777' }}>
                            Total URLs Narrowed
                        </Typography>
                        <Typography  style={{ color: '#333333', fontWeight: 'bold' }}>
                            {totalUrls}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
            {/* Total Clicks and Account Statistics */}
            <Grid item xs={8} md={5} lg={3}>
                <Paper elevation={3} style={{ padding: '1rem', background: '#ffffff' }}>
                    <Box textAlign="center">
                        <Typography  gutterBottom style={{ color: '#777777' }}>
                            Your Narrowed url Clicks
                        </Typography>
                        <Typography  style={{ color: '#333333', fontWeight: 'bold' }}>
                            {totalClicks}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>

            
        </Grid>
    );
};

export default AccountStats;
