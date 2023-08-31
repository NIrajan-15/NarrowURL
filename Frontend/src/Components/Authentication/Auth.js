import React,{useState, useEffect, useContext} from 'react';
import app from '../../Firebase/Firebase.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const AuthContext = React.createContext();

export function AuthProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth(app);
    
    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
                if(!user){
                    setCurrentUser(null);
                } 
                else{
                    setCurrentUser(user);
                }  
        });
    }, [])
        
   
    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthValue(){
    return useContext(AuthContext)
  }
