import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { app } from "./firebaseConfig";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/' element={ <Login /> } />
      </Routes>
    </div>
  )
}

export default App
