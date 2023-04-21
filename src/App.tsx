import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from './components/Home';
import { app, database } from "./firebaseConfig";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/home' element={ <Home database={database} /> } />
      </Routes>
    </div>
  )
}

export default App
