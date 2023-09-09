import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const  SessionManager = () => {
const navigate = useNavigate();
  useEffect(() => {
    // Define the session timeout duration (2 hours = 7200000 milliseconds)
    const sessionTimeout = 7200000;

    // Check if there's a last active timestamp in local storage
    const lastActiveTimestamp = localStorage.getItem('lastActiveTimestamp');
    const currentTime = Date.now();
    
    // If there's no timestamp or the session has expired, log the user out
    if (!lastActiveTimestamp || currentTime - lastActiveTimestamp > sessionTimeout) {
      // You can implement logout logic here, e.g., redirect to the login page
      alert('Your session has expired due to inactivity.');
      // Clear local storage
      localStorage.clear();
    }

    // Update the last active timestamp in local storage
    localStorage.setItem('lastActiveTimestamp', currentTime.toString());

    // Set up a timer to check session expiration periodically (e.g., every minute)
    const sessionCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const lastActiveTimestamp = localStorage.getItem('lastActiveTimestamp');

      if (lastActiveTimestamp && currentTime - lastActiveTimestamp > sessionTimeout) {
        clearInterval(sessionCheckInterval);
        // You can implement logout logic here as well
        alert('Your session has expired due to inactivity.');
        localStorage.clear();
        navigate('/signup');
      }
    }, 30000); // Check every half minute

    // Clean up the timer when the component unmounts
    return () => clearInterval(sessionCheckInterval);
  }, []);

  return null; // This component doesn't render anything
}

export default SessionManager;
