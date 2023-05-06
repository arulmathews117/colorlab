import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from './components/Home';
import { app, database } from "./firebaseConfig";


function App() {

  return (
    <div>
    <Routes>
      <Route path='/' element={ <Login /> } />
      <Route path='/home' element={ <Home /> } />
    </Routes>
  </div>
  )
}

export default App
