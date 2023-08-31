import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import app from "../../Firebase/Firebase.js";

export function Register({ email, password, confirmPassword, username }){
    const [currentUser, setCurrentUser] = useState(null);
    
    if (password !== confirmPassword) {
        return("Passwords do not match");
        ;
    }
    try {
        app.auth().createUserWithEmailAndPassword(email, password);
        setCurrentUser(true);
    } catch (error) {
        return(error.message); // Set the error message
    }
    
    if (currentUser) {
        return <Navigate to="/login" />;
    }
    
};
