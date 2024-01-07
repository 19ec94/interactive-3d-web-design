import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import {Forgot} from './components/pages/Forgot';
import {Scoreboard} from './components/pages/Scoreboard';
import {Home} from './components/pages/Home';
import {Levels} from './components/pages/Levels';
import {Login} from './components/pages/Login';
import {About} from './components/pages/About';
import {Signup} from './components/pages/Signup';

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
