import React, {useState} from 'react';
import { Button, ButtonGroup, Typography, Grid, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import app from '../../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Signup() {

    const [formData, setFromData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
    });

    const history = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState();
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

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

    const toggleSignup = () => {
        setFromData({
            email: '',
            password: '',
        })
        setIsSignup(true);
        setIsLogin(false);
        setMessage('');
    }

    const auth = getAuth(app);
    
    const authenticate = async(e) => {

        e.preventDefault();
        if(isLogin) {
            
            await signInWithEmailAndPassword(auth,formData.email, formData.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                setCurrentUser(true);
                history('/');
                
            })
            .catch((error) => {

                setMessage(error.message);
            }); 
          }
        else {
            if (formData.password !== formData.confirmPassword) {
                setMessage("Passwords do not match");
                return;
            }

            await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setCurrentUser(true);   
                history('/');
            }
            )
            .catch((error) => {
                console.log(error);
                setMessage(error.message);
            });   

        }
        
    }


    return (
        <>

    <Grid container  style={{width: '100vw',height: '70%',justify:"center",alignItems:'center',padding:'2%',marginTop:'6%'}} >
        <Grid item xs={0} sm={1} md={3} lg={4} >
        
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={4} >
        <Paper style={{minHeight:'60%'}} >
            
            <ButtonGroup style={{width:'100%'}}>
                <Button  style={{width:'100%'}} onClick={toggleLogin} >Login</Button>
                <Button  style={{width:'100%'}} onClick={toggleSignup} >Signup</Button>
            </ButtonGroup>
            
            <Box style={{padding:'2%'}}>

            <form onSubmit={authenticate} >
            <Typography variant="h4" align='center' padding='5% 0% 5% 0%'>
                {isLogin ? "Login" : "Signup"}
            </Typography>
            
            {isSignup &&
            <>
            <TextField id="username"
                    label="&#128100;  Username"
                    type="username"
                    variant="outlined"
                    fullWidth
                    value = {formData.firstname}
                    onChange={(e) => setFromData({...formData, username: e.target.value})}
                    margin="normal"
            
            ></TextField>
            
            </>}
          
            <TextField id="email"
                    label="&#x2709;  Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value = {formData.email}
                    onChange={(e) => setFromData({...formData, email: e.target.value})}
                    margin="normal">
                    
            </TextField>
            
            <TextField id="password"
                    label="&#128477; Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value = {formData.password}
                    onChange={(e) => setFromData({...formData, password: e.target.value})}
                    margin="normal"
            
            ></TextField>

            {isSignup &&
                <TextField id="confirmPassword"
                    label="&#128477; Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value = {formData.confirmPassword}
                    onChange={(e) => setFromData({...formData, confirmPassword: e.target.value})}
                    margin="normal"
            
            ></TextField>}

            <hr></hr>
        
            <Typography color="red" align='center' padding='5% 0% 5% 0%'>
                {message}
            </Typography>
            
            <Button type="submit" variant="contained" size="large" style={{width:'40%',marginLeft:'30%'}}>
                {isSignup ? "Signup":"Login"}
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