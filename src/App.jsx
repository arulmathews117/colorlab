import Home from "./components/Home";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { app, database } from "./firebaseConfig";
import Folder from "./components/Folder";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home database={database} />} />
        <Route path="/folder/:id" element={<Folder database={database} />} />
      </Routes>
    </div>
  );
}

export default App;
