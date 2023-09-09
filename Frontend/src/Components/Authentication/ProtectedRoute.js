import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Auth';
import Grid from '@mui/material/Grid';

const ProtectedRoute = ({component: Component, nav: Nav, ...rest}) => {
    const currentUser = useContext(AuthContext);
    const localUser = localStorage.getItem('currentUser');
    
    // render the component only if user is authenticated
    return (
        <>
        
        {currentUser && localUser ? <>
        
            <Nav />
            <Component />
        
        </>
         : <Navigate to="/signup" />}
        
        </>
    )
}

export default ProtectedRoute;