import "./App.css";
import { Navbar } from "./components/Navbar";
import {Route, Routes } from "react-router-dom";

import {Forgot} from './components/pages/Forgot';
import {Scoreboard} from './components/pages/Scoreboard';
import {Home} from './components/pages/Home';
import {Levels} from './components/pages/Levels';
import {Login} from './components/pages/Login';
import {About} from './components/pages/About';
import {Signup} from './components/pages/Signup';
import {AuthProvider} from './components/AuthContext';
import {ProtectedRoute} from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path="/forgot" element={<Forgot />} />
          <Route exact path="/scoreboard" element={<Scoreboard />} />
          <Route exact path="/levels"
            element={
              <ProtectedRoute>
                <Levels />
              </ProtectedRoute>
            } 
          />
          <Route exact path="/dashboard"
            element={
              <ProtectedRoute>
                <Levels />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
