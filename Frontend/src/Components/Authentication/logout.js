import { getAuth, signOut } from "@firebase/auth";
import app from '../../Firebase/Firebase';


const logout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    }
    
export default logout;
        


