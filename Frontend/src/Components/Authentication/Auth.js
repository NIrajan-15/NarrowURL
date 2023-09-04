import React, { useState, useEffect, useContext } from 'react';
import app from '../../Firebase/Firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Create a context for authentication
export const AuthContext = React.createContext();

// Authentication provider component
export function AuthProvider({ children }) {
    // State to hold the current user
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth(app);

    // Effect to listen for changes in authentication state
    useEffect(() => {
        // When the authentication state changes
        onAuthStateChanged(auth, (user) => {
            // If there's no user, set currentUser to null
            if (!user) {
                setCurrentUser(null);
            } else {
                // If there's a user, set currentUser to the user
                setCurrentUser(user);
            }
        });
    }, []);

    // Provide the authentication context to child components
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to access the authentication context
export function useAuthValue() {
    return useContext(AuthContext);
}
