import { BorderAllRounded } from "@mui/icons-material";
import React from "react";
import GoogleButton from "react-google-button";

export default function Auth() {
    return (<div>
        <div className="auth-btn">
        <h1>Sign In with Google...</h1>
        <GoogleButton
            onClick={() => {}}   
        />
        </div>
    </div>
    );
}