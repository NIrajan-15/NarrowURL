import React, { useState, useContext } from 'react';
import {
    Toolbar, Typography, IconButton,
    Grid, Avatar, Menu, MenuItem, Drawer, Box
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuIcon from '@mui/icons-material/Menu'; // Import the MenuIcon
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../Authentication/Auth';
import logout from '../Authentication/Logout';

const Navigation = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Handle click on user avatar
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the user menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Toggle the side drawer
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };


    // Access user data from AuthContext
    const { currentUser } = useContext(AuthContext);

    // Content for the side drawer
    const drawerContent = (
        <Box sx={{ width: 300 }} justifyContent={'center'}>
            <Toolbar style={{ borderRadius: '0', backgroundColor: 'white' }}>
             <LinkIcon />  <Typography textAlign={'center'} variant="h6">NarrowURL</Typography>
            </Toolbar>
            <Box marginTop='40%'>
                <Link to="/" onClick={toggleDrawer(true)} style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem>
                        <Typography width='100%' textAlign={'center'} >
                            <HomeIcon sx={{ marginRight: '1vw' }} />
                            Home
                        </Typography>
                    </MenuItem>
                </Link>
                <Link to="/stats" onClick={toggleDrawer(true)} style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem>
                        <Typography width='100%' textAlign={'center'} >
                            <BarChartIcon sx={{ marginRight: '1vw' }} />
                            Stats
                        </Typography>
                    </MenuItem>
                </Link>
            </Box>
        </Box>
    );

    return (
        <>
            <Box position="fixed" sx={{ backgroundColor: '#f2f2f0', color: 'black', width: '100%', zIndex: '99' }}>
                <Toolbar style={{ borderRadius: '0' }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        
                        <Grid item xs={1}>
                        {currentUser && (
                            <>
                            <IconButton onClick={toggleDrawer(true)} style={{ marginLeft: 'auto' }}>
                                <MenuIcon />
                            </IconButton>
                            </>
                        )}
                        </Grid>
                        
                        <Grid item xs={9}>
                            
                            <Typography variant="h6" onClick={()=>window.location.href='/'} style={{ textAlign: 'center' }}>NarrowURL</Typography>
                        </Grid>
                        
                        <Grid item xs={2} sm={1}>
                        {currentUser && (
                            <>
                            <IconButton onClick={handleAvatarClick}>
                                <Avatar>
                                    <AccountCircleIcon />
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={()=>{window.location.href='/profile'}}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                            </>
                            )}
                        </Grid>
                        
                    </Grid>
                </Toolbar>
            </Box>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerContent}
            </Drawer>
            <Grid container>
                {/* You can add more content here if needed */}
            </Grid>
        </>
    );
};

export default Navigation;
