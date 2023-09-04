import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
} from '@mui/material';

const fields = ['URLs', 'Clicks', 'Countries', 'Devices'];
const values = [210, 1234, 32, 992];

const AccountStats = () => {
    const [totalClicks, setTotalClicks] = useState(1234);
    const [totalUrls, setTotalUrls] = useState(210);
    

    return (
        <Box>
        <Grid container spacing={3} paddingTop={15} justifyContent="center" marginBottom={{xs:2, sm:2, md:2, lg:0}} alignItems="center">
            {/* Total URLs Section */}
            {fields.map((field, index) => (
                <Grid item xs={3} md={3} lg={3} key={index}>
                <Paper elevation={3} style={{ padding: '1rem',  height:'50px' }}>
                    <Box textAlign="center">
                    <Typography fontSize="2vh" style={{ color: '#000000' }} gutterBottom>
                            {values[index]}
                        </Typography>
                        <Typography  gutterBottom style={{ color: '#777777' }}>
                            {field} 
                        </Typography>
                        
                    </Box>
                </Paper>
            </Grid>
            ))}
            
        </Grid>
        </Box>
    );
};

export default AccountStats;
