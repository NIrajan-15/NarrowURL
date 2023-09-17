import React, { useContext } from 'react';
import { Paper, Typography, Avatar, Container } from '@mui/material';
import { AuthContext } from '../Authentication/Auth';

const UserProfile = () => {

  // get currrnt user from AuthContext
  const user = JSON.parse(localStorage.getItem('currentUser')) || [];
  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
        <Avatar
          alt={'a'}
          sx={{
            width: 150,
            height: 150,
            marginBottom: '16px',
            backgroundColor: '#1976D2', // You can set a specific background color
          }}
        >
          {user.displayName} {/* Display the first character of the username */}
        </Avatar>
        <Typography variant="h5"></Typography>
        <Typography variant="body1" color="textSecondary">
          
          {user.email}
        </Typography>
      </Paper>
    </Container>
  );
};

export default UserProfile;
