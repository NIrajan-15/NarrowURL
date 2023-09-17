import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";

 
 // Handle user logout
 const logout = async () => {

    const auth = getAuth();

    await signOut(auth).then(() => {
        console.log("Logged out");
        localStorage.clear();
        localStorage.removeItem('lastActiveTimestamp', new Date().toString());
        window.location.href="/signup"
    });
}

export default logout;