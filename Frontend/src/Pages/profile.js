import React from 'react';
import UrlList from '../Components/Profile/Links';
import ProfilePage from '../Components/Profile/UserProfile';
import {Grid, Box} from '@mui/material';

const Profile = () => {
    return (
        <>
        <Box>
        <Grid container justifyContent={'center'} sx={{width:'100h', marginTop:'10vh'}}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
            <ProfilePage />
        </Grid>
        <Grid item xs={11} sm={10} lg={6}>
            <UrlList />
        </Grid>
        </Grid>
        </Box>
        </>
    )
}
export default Profile;