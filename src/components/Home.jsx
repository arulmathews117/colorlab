import React, { useEffect, useState } from "react";
import { FiFilePlus, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { auth, storage } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  let navigate = useNavigate();
  let userEmail = localStorage.getItem("userEmail");
  const [progress, setProgress] = useState(null);
  const [imageList, setImageList] = useState([]);

  const uploadImage = (event) => {
    const imageRef = ref(storage, `${userEmail}/${event.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(imageRef, event.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
      },
      (error) => {
        toast.error(error.message, {
          autoClose: 1500,
        });
      },
      () => {
        setProgress(null)
        toast.success("File Added", {
          autoClose: 1500,
        });
      }
    );
  };

  const readData = () => {
    const imageListRef = ref(storage, `${userEmail}/`);
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userEmail");
        toast.success("Logged Out", {
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 1500,
        });
      });
  };

  const authState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    readData();
    authState();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="title-container">
        <h1>ColorLab</h1>
      </div>
      <div className="icon-container">
        <div className="upload-btn-wrapper">
          <FiFilePlus color="#757575" className="icon" size={50} />
          <input type="file" name="myfile" onChange={uploadImage} />
        </div>

        <FiLogOut color="#f44336" size={50} className="icon" onClick={logOut} />
      </div>
      <div className="progress-bar-container">
        {progress ? <ProgressBar completed={progress} /> : <></>}
      </div>
      <div className="grid-parent">
      </div>
    </div>
  );
}
