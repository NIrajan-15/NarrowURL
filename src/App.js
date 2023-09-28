import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import Home from './Pages/Home';
import Stats from './Pages/Stats';
import ProtectedRoute from './Components/Authentication/ProtectedRoute';
import Navigation from './Components/Nav/NavBlock';
import { AuthProvider } from './Components/Authentication/Auth';
import { Box } from '@mui/material';
import Profile from './Pages/profile';
import Redirect from './Pages/Redirect';
function App() {
  
  return (
    <>
       
        <Box className='page-content'>
        
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
          <Route path='/:shortUrl' element={<Redirect />} />
        </Routes>
        </AuthProvider>
        </Box>

    </>
  );
}

export default App;
