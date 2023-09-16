import React, { useState } from 'react';
import { Button, ButtonGroup, Typography, Grid, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import app from '../../Firebase/Firebase'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Signup() {
    // State to manage form data
    const [formData, setFromData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    const navigate = useNavigate();

    // State to manage login/signup toggles
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState();
    
    // State to display error/success messages
    const [message, setMessage] = useState('');

    // Toggle to login view
    const toggleLogin = () => {
        setIsLogin(true);
        setIsSignup(false);
        setFromData({
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        });
        setMessage('');
    }

    // Toggle to signup view
    const toggleSignup = () => {
        setFromData({
            email: '',
            password: '',
        })
        setIsSignup(true);
        setIsLogin(false);
        setMessage('');
    }

    // Get Firebase authentication instance
    const auth = getAuth(app);
    
    // Authenticate user (login/signup)
    const authenticate = async (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // login user with email and password
            await signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate('/');

                })
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setMessage('Invalid email address.');
                            break;
                        case 'auth/user-disabled':
                            setMessage('User with this email has been disabled.');
                            break;
                        case 'auth/user-not-found':
                            setMessage('User with this email does not exist.');
                            break;
                        case 'auth/wrong-password':
                            setMessage('Invalid password.');
                            break;
                        default:
                            setMessage('An error occurred while logging in.');
                            break;
                    }
                }); 
        } else {
            if (formData.password !== formData.confirmPassword) {
                setMessage("Passwords do not match");
                return;
            }

            // signup user with email and password
            await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then(async (userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    await updateProfile(user, {
                        displayName: formData.username
                    });

                    setIsLogin(true);
                    setIsSignup(false);
                })
                .catch((error) => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                          setMessage('Email address is already in use.');
                          break;
                        case 'auth/invalid-email':
                          setMessage('Invalid email address.');
                          break;
                        case 'auth/weak-password':
                          setMessage('Password should be at least 6 characters long.');
                          break;
                        default:
                          setMessage('An error occurred while signing up.');
                          break;
                      }
                });   
        }
    }

    return (
        // JSX for the signup form
        <>
            {/* Grid container for the signup form */}
            <Grid container paddingTop={{xs:'20%', lg:'5%'}} style={{  justifyContent: "center", alignItems: 'center' }}>

                

                {/* Main grid item containing the form */}
                <Grid item xs={12} sm={10}  lg={3}>
                    <Paper style={{ minHeight: '60%' }}>

                        {/* Button group for toggling between login and signup */}
                        <ButtonGroup style={{ width: '100%' }}>
                            <Button style={{ width: '100%' }} onClick={toggleLogin}>Login</Button>
                            <Button style={{ width: '100%' }} onClick={toggleSignup}>Signup</Button>
                        </ButtonGroup>

                        {/* Box for form contents */}
                        <Box style={{ padding: '2%' }}>

                            {/* Form for authentication */}
                            <form onSubmit={authenticate}>
                                {/* Typography for the form title */}
                                <Typography variant="h4" align='center' padding='5% 0% 5% 0%'>
                                    {/* Title content */}
                                </Typography>

                                {/* Display username input for signup */}
                                {isSignup &&
                                    <>
                                        <TextField
                                            id="username"
                                            label="&#128100;  Username"
                                            type="username"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            value={formData.username}
                                            onChange={(e) => setFromData({ ...formData, username: e.target.value })}
                                            margin="normal"
                                        ></TextField>
                                    </>
                                }

                                {/* Common input fields for email and password */}
                                <TextField
                                    id="email"
                                    label="&#x2709;  Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFromData({ ...formData, email: e.target.value })}
                                    margin="normal"
                                ></TextField>

                                <TextField
                                    id="password"
                                    label="&#128477; Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFromData({ ...formData, password: e.target.value })}
                                    margin="normal"
                                ></TextField>

                                {/* Display confirmPassword input for signup */}
                                {isSignup &&
                                    <TextField
                                        id="confirmPassword"
                                        label="&#128477; Confirm Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFromData({ ...formData, confirmPassword: e.target.value })}
                                        margin="normal"
                                    ></TextField>
                                }

                                <hr></hr>

                                {/* Display error message */}
                                <Typography color="#f27787" align='center' padding='3% 0% 3% 0%'>
                                    {message}
                                </Typography>

                                {/* Submit button */}
                                <Button type="submit" variant="contained" style={{ width: '40%', marginLeft: '30%' }}>
                                    {isSignup ? "Signup" : "Login"}
                                </Button>

                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default Signup;
