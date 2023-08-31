import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landing';
import Home from './Pages/Home';
import Stats from './Pages/Stats';
import ProtectedRoute from './Components/Authentication/ProtectedRoute';
import Navigation from './Components/Nav/NavBlock';
import { AuthProvider } from './Components/Authentication/Auth';
import React from 'react';


function App() {

  return (

    <>
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
          
          
        </Routes>
        </AuthProvider>
        
      
    </>
  );
}

export default App;