import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Auth';
import { Box } from '@mui/system';
import sessionManager from '../SessionsManager';
import  '../../App.css';

const ProtectedRoute = ({component: Component, nav: Nav, ...rest}) => {
    const currentUser = useContext(AuthContext);
    const localUser = localStorage.getItem('currentUser');
    
    // render the component only if user is authenticated
    return (
        <>
        
        {currentUser && localUser ? <>
        
            <Nav />
            <Box>
            <sessionManager />
            <Component />
            </Box>
            
        
        </>
         : <Navigate to="/signup" />}
        
        </>
    )
}

export default ProtectedRoute;