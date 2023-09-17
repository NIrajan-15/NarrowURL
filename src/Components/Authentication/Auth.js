import React, { useState, useEffect, useContext } from 'react';
import app from '../../Firebase/Firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import logout from './Logout.js';

// Create a context for authentication
export const AuthContext = React.createContext();

// Authentication provider component
export function AuthProvider({ children }) {

    // State to hold the current user
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const auth = getAuth(app);
    const dataUrl = process.env.REACT_APP_USER_DATA;

    // Effect to listen for changes in authentication state
    useEffect(() => {

        // When the authentication state changes
        onAuthStateChanged(auth, (user) => {
            // If there's no user, set currentUser to null
            if (user && user.accessToken) {
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                const uri = process.env.REACT_APP_GET_USER_DATA+user.email;
                fetch(uri,{})
                .then(res => res.json())
                .then(data => {
                const tempData = [];
                data.forEach((click) => {
                    tempData.push(click);
                }
                )
                setUserData(Array.from(data));
                localStorage.setItem('userData', JSON.stringify(data));

                })
                .catch(error => console.log('error', error));
            } else {
                // If there's a user, set currentUser to the user
                setCurrentUser(null);
                localStorage.clear();
                
            }

        });
    }, []);

    // Provide the authentication context to child components
    return (
        <>
        <AuthContext.Provider value={ {currentUser, userData} }>
            {children}
        </AuthContext.Provider>
        </>
    );
}

// Custom hook to access the authentication context
export function useAuthValue() {
    return useContext(AuthContext);
}
