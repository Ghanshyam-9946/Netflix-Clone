
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyB5xQqbS6RbrUZjH94EaXQ3mcCBBn_Bgcw",
  authDomain: "netflix-clone-67a64.firebaseapp.com",
  projectId: "netflix-clone-67a64",
  storageBucket: "netflix-clone-67a64.firebasestorage.app",
  messagingSenderId: "139074741114",
  appId: "1:139074741114:web:7dc789d276ce27aea3acc3",
  measurementId: "G-WYG9P8J7ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email,password)
        const user = res.user
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider : "local",
            email,

        })
    
    } catch (error) {
        console.log(error)
        toast.error(error.code)
    }

}

const login = async(email, password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
    console.log(error)
    toast.error(error.code)    
    }

}

const logout= ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};