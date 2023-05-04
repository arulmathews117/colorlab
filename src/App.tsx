import { useState } from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { app, database } from "./firebaseConfig";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home/:id" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
