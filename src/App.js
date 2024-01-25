import "./App.css";
import { Navbar } from "./components/Navbar";
import {Route, Routes } from "react-router-dom";

import {Forgot} from './components/Forgot';
import {Scoreboard} from './components/Scoreboard';
import {Home} from './components/Home';
import {Levels} from './components/Levels';
import {Dashboard} from './components/Dashboard';
import {Login} from './components/Login';
import {About} from './components/About';
import {Signup} from './components/Signup';
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
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
