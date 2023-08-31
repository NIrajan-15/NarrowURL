import React ,{useState, useContext} from 'react';
import { AppBar, Toolbar, Typography, IconButton, Grid, 
         Avatar, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getAuth, signOut } from "@firebase/auth";
import app from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/Auth';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = getAuth(app);

  const navigate = useNavigate();

  const currentUser = useContext(AuthContext);

  const logout =  async() => {
    await signOut(auth).then(() => {
      console.log("Logged out");
      navigate('/signup');
    }).catch((error) => {
      console.log(error);
    });

    handleClose();
  }


    return (
      <>
        <AppBar position="fixed" height={{xs:'15vh',sm:'10vh'}}>
            <Toolbar style={{ height: '100%' }}>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                    {/* App Name */}
                    <Grid item xs={10} sm={11}>
                        <Typography variant="h6">
                            NarrowURL 
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sm={1}>
                      <IconButton onClick={handleAvatarClick} style={{ color: '#ffffff' }}>
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>
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
