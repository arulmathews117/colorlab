import { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Auth() {
    let googleProvider = new GoogleAuthProvider();
    let navigate = useNavigate();
    const signUp = () => {
        signInWithPopup(auth, googleProvider)
            .then(res => {
                localStorage.setItem('userEmail', res.user.email);
                toast.success("Logged In!")
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/home')
            }
            else {
                navigate('/')
            }
        })
    }, [])
    return (
        <div className='auth-btn'>
            <ToastContainer />
            <h1>Sign In with Google..</h1>
            <GoogleButton
                onClick={signUp}
            />
        </div>
    )
}
