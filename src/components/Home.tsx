import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ database }) {
  let databaseCollection = collection(database, "docs-data");
  let userEmail = localStorage.getItem("userEmail");
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [docsData, setDocsData] = useState([]);
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
      body: "",
    })
      .then((response) => {
        toast.success("Project Created", {
          autoClose: 1000,
        });
        setIsAdd(false);
        setTitle("");
      })
      .catch(() => {
        toast.error("Cannot Add Data", {
          autoClose: 1000,
        });
      });
  };

  useEffect(() => {
    onSnapshot(databaseCollection, (response) => {
      setDocsData(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1>Home</h1>
      <div className="logout-container">
        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
      </div>

      <button onClick={() => setIsAdd(!isAdd)} className="add-doc">
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
          <button onClick={addProject} className="add-btn">
            Add
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="grid-main">
        {docsData
          .filter((doc) => doc.author === userEmail)
          .map((doc) => {
            return (
              <div className="grid-child">
                <h3>{doc.title}</h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}
