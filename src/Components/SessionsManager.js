import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logout from '../Components/Authentication/Logout';

const SessionManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Define the session timeout duration (2 hours = 7200000 milliseconds)
    const sessionTimeout = 3000;
    
    // Function to handle user activity and update the last active timestamp
    const handleUserActivity = () => {
      localStorage.setItem('lastActiveTimestamp', Date.now());
    };

    // Add event listeners to track user activity (e.g., mouse move or keydown)
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('click', handleUserActivity);


    // Initialize the last active timestamp or get it from local storage
    const lastActiveTimestamp = localStorage.getItem('lastActiveTimestamp');
    

    // If there's no timestamp or the session has expired, log the user out
    if (!lastActiveTimestamp || Date.now() - lastActiveTimestamp > sessionTimeout) {
      logout();
    }

    // Set up a timer to check session expiration periodically (e.g., every minute)
    const sessionCheckInterval = setInterval(() => {
      const lastActiveTimestamp = localStorage.getItem('lastActiveTimestamp');

      if (lastActiveTimestamp && Date.now() - lastActiveTimestamp > sessionTimeout) {
        clearInterval(sessionCheckInterval);
        // You can implement logout logic here as well
        alert('Your session has expired due to inactivity.');
        logout();
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
