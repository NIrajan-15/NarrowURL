import React, { useState } from 'react';
import {
    Toolbar, Typography, IconButton,
    Grid, Avatar, Menu, MenuItem, Box
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAuth, signOut } from "@firebase/auth";


const Navigation = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    // Handle click on the avatar icon
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle menu close
    const handleClose = () => {
        setAnchorEl(null);
    };

    const auth = getAuth(); // Get Firebase authentication instance
    const navigate = useNavigate();

    // Function to log out the user
    const logout = async () => {
        await signOut(auth).then(() => {
            console.log("Logged out");
            localStorage.clear(); // Remove user data from local storage
            navigate('/signup'); // Navigate to the signup page after logout
        });
    }

    const tabStyle = {
        color: 'black',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.0)',
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        padding: '8px',
        fontFamily: 'ubuntu',
    }


    return (
        <>
            {/* App navigation bar */}
            <Box position="fixed"  sx={{backgroundColor:'white', color:'black', width:'100vw'}}>
                <Toolbar style={{  borderRadius:'0' }}>
                    {/* Grid container for navigation elements */}
                    <Grid container justifyContent="center" alignItems="center">
                        {/* App Name */}
                        <Grid item xs={2} sm={4} lg={5}>
                            <Typography variant="h6">
                                NarrowURL
                            </Typography>
                        </Grid>
                        {/* Avatar icon and user menu */}
                        
                        {/* Home icon and link */}
                        <Grid item xs={4.5} sm={2.5} lg={2} paddingTop={{xs:13, sm:10}}>
                            <IconButton component={Link} to="/"style={tabStyle}>
                                <HomeIcon />Home
                            </IconButton>
                        </Grid>
                        {/* Stats icon and link */}
                        <Grid item xs={4.5} sm={1.5} lg={2} paddingTop={{xs:13, sm:10}}>
                            <IconButton component={Link} to="/stats" style={tabStyle}>
                                <BarChartIcon /> Stats
                            </IconButton>
                        </Grid>
                        
                        <Grid item xs={1} sm={3} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={handleAvatarClick}>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            </IconButton>
                            {/* User menu */}
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                {/* Menu items */}
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Box>
            <Grid container>
                {/* You can add more content here if needed */}
            </Grid>
        </>
    );
};

export default Navigation;
