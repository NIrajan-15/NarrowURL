import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Auth';

const ProtectedRoute = ({component: Component, nav: Nav, ...rest}) => {
    const currentUser = useContext(AuthContext);
    return (
        <>
        {currentUser ? (
            <>
            <Nav />
            <Component />
            </>
        ) : (
            <Navigate to="/signup" />
        )}
        
        </>
    )
}

export default ProtectedRoute;