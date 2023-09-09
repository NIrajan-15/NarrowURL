import React, { useState, useEffect, useContext } from 'react';
import app from '../../Firebase/Firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import StatsFilter from '../Stats/Filter.js';

const FullData = [
  {
    userId: 'user1',
    name: 'URL 1',
    longUrl: 'https://example.com/url/15fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/1',
    country: 'Canada',
    date: Math.floor(new Date('2023-04-15').getTime()),
    device: 'Tablet',
  },
  {
    userId: 'user1',
    name: 'URL 2',
    longUrl: 'https://example.com/url/25fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/2',
    country: 'Cananda',
    date: Math.floor(new Date('2022-11-05').getTime()),
    device: 'Laptop',
  },
  {
    userId: 'user1',
    name: 'URL 3',
    longUrl: 'https://example.com/url/35fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/3',
    country: 'Canada',
    date: Math.floor(new Date('2022-10-20').getTime()),
    device: 'Laptop',
  },
  {
    userId: 'user1',
    name: 'URL 1',
    longUrl: 'https://example.com/url/15fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/1',
    country: 'Canada',
    date: Math.floor(new Date('2023-05-15').getTime()),
    device: 'Mobile',
  },
  {
    userId: 'user1',
    name: 'URL 2',
    longUrl : 'https://example.com/url/25fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/2',
    country: 'India',
    date: Math.floor(new Date('2022-11-05').getTime()),
    device: 'Desktop',
  },
  {
    userId: 'user1',
    name: 'URL 4',
    longUrl: 'https://example.com/url/45fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/4',
    country: 'Nepal',
    date: Math.floor(new Date('2022-12-10').getTime()),
    device: 'Mobile',
  },
  {
    userId: 'user1',
    name: 'URL 5',
    longUrl : 'https://example.com/url/5fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/5',
    country: 'England',
    date: Math.floor(new Date('2023-03-07').getTime()),
    device: 'Laptop',
  },
  {
    userId: 'user1',
    name: 'URL 3',
    longUrl: 'https://example.com/url/35fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/3',
    country: 'United States',
    date: Math.floor(new Date('2022-10-20').getTime()),
    device: 'Tablet',
  },
  {
    userId: 'user1',
    name: 'URL 2',
    longUrl: 'https://example.com/url/25fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/2',
    country: 'Nepal',
    date: Math.floor(new Date('2022-11-05').getTime()),
    device: 'Desktop',
  },
  {
    userId: 'user1',
    name: 'URL 6',
    longUrl: 'https://example.com/url/65fsdfdsfjsklfwlfh',
    shortUrl: 'https://example.com/url/6',
    country: 'Nepal',
    date: Math.floor(new Date('2023-04-12').getTime()),
    device: 'Mobile',
  },
]

// Create a context for authentication
export const AuthContext = React.createContext();

// Authentication provider component
export function AuthProvider({ children }) {

    

    // State to hold the current user
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState(FullData);
    const auth = getAuth(app);

    

    // Effect to listen for changes in authentication state
    useEffect(() => {
        // When the authentication state changes
        onAuthStateChanged(auth, (user) => {
            // If there's no user, set currentUser to null
            if (user && user.accessToken) {
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                // If there's a user, set currentUser to the user
                setCurrentUser(null);
                localStorage.removeItem('currentUser');
            }
        });
    }, []);

    // Provide the authentication context to child components
    return (
        <>
        <AuthContext.Provider value={ {currentUser, data} }>
            {children}
        </AuthContext.Provider>
        </>
    );
}

// Custom hook to access the authentication context
export function useAuthValue() {
    return useContext(AuthContext);
}
