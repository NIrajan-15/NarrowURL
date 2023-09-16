import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Define the session timeout duration (2 hours = 7200000 milliseconds)
    const sessionTimeout = 5000;
    
    // Function to handle user activity and update the last active timestamp
    const handleUserActivity = () => {
      localStorage.setItem('lastActiveTimestamp', Date.now());
    };

    // Add event listeners to track user activity (e.g., mouse move or keydown)
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    // Initialize the last active timestamp or get it from local storage
    const lastActiveTimestamp = localStorage.getItem('lastActiveTimestamp');
    
    // Function to log the user out
    const logoutUser = () => {
      // You can implement logout logic here, e.g., redirect to the login page
      // Clear local storage
      localStorage.clear();
      navigate('/signup');
    };

    // If there's no timestamp or the session has expired, log the user out
    if (!lastActiveTimestamp || Date.now() - lastActiveTimestamp > sessionTimeout) {
      logoutUser();
    }

    // Set up a timer to check session expiration periodically (e.g., every minute)
    const sessionCheckInterval = setInterval(() => {
      const lastActiveTimestamp = localStorage.getItem('lastActiveTimestamp');

      if (lastActiveTimestamp && Date.now() - lastActiveTimestamp > sessionTimeout) {
        clearInterval(sessionCheckInterval);
        // You can implement logout logic here as well
        alert('Your session has expired due to inactivity.');
        logoutUser();
      }
    }, 60000); // Check every minute

    // Clean up the event listeners and timer when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearInterval(sessionCheckInterval);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default SessionManager;
