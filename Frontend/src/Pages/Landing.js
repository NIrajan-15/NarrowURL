import React,{useState} from 'react';
import Signup from '../Components/Authentication/Signup';
import { Grid, Box, Typography, Button } from '@mui/material';
import FirstPage from '../Components/Landing Page/FirstPage';


const LandingPage = () => {
    const [login, setLogin] = useState(false);
    return(
        <>
        <Grid container p={2}>
            <Grid item xs={9} sm={11}>
                <Typography variant="h5" sx={{paddingTop:'1vh'}}>
                    NarrowURL
                </Typography>
            </Grid>
           
            <Grid item xs={3} sm={1}>
                <Button variant="outlined" onClick={() => setLogin(!login)}>
                    {login ? 'back' : 'Login'}
                </Button>

            </Grid>
        </Grid>
        <Box  padding={2}>
        <Grid container justifyContent={'center'}>
        {login ?
        (
            <Grid item sm={12} lg={12}>
            <Signup />
            </Grid>
        )
        :
        (
            <Grid item sm={12} lg={12} sx={{paddingTop:'10vh',display:'flex', alignContent:'center', justifyContent:'center'}}>
            <FirstPage />
            </Grid>
        )}
        
          
        </Grid>
        </Box>
        </>
    )
    
}

export default LandingPage;