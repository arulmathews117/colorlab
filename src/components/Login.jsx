import { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login() {
  let navigate = useNavigate();
  let googleProvider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        localStorage.setItem("userEmail", res.user.email);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="google-btn">
        <h1>Sign In with Google...</h1>
      <GoogleButton onClick={signIn} />
    </div>
  );
}
