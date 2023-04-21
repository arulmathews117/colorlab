import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";


export default function Home({ database }) {
  let databaseCollection = collection(database, "docs-data");
  let userEmail = localStorage.getItem("userEmail");
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  let navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      navigate("/");
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

  const addProject = () => {
    addDoc(databaseCollection, {
        title: title,
        author: userEmail,
        body: ""
    })
    .then(response => {
        alert("Data Added")
        setIsAdd(false);
        setTitle("")
    })
    .catch(() => {
        alert("Cannot Add Data")
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="logout-container">
        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
      </div>

      <button onClick={() => setIsAdd(true)} className="add-doc">
        Add Project
      </button>
      {isAdd ? (
        <div className="title-input">
          <input
            className="add-title"
            value={title}
            placeholder="Add a Title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button onClick={addProject} className="add-btn">Add</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
