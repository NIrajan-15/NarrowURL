import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import Home from './Pages/Home';
import Stats from './Pages/Stats';
import ProtectedRoute from './Components/Authentication/ProtectedRoute';
import Navigation from './Components/Nav/NavBlock';
import { AuthProvider } from './Components/Authentication/Auth';
import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import SessionManager from './Components/SessionsManager';
import Profile from './Pages/profile';

function App() {
  
  return (
    <>
        <Box class='page-content'  sx={{ backgroundColor: 'white'}}>
        <SessionManager />
        <AuthProvider>
        <Routes>
          <Route  path="/signup" element={<LandingPage />} />
          <Route
          path="/"
          element= {<ProtectedRoute component={Home} nav={Navigation} />}
          />
          <Route 
          path="/stats"
          element={<ProtectedRoute component={Stats} nav={Navigation} />}
          />
          <Route path='/profile' 
          element={<ProtectedRoute component={Profile} nav={Navigation} />}
          />
          
        </Routes>
        </AuthProvider>
        </Box>
        
      
    </>
  );
}

export default App;
