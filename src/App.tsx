import { useState } from "react";
import Home from "./components/Home";
import Auth from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import { app, database } from "./firebaseConfig";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home/:id" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
