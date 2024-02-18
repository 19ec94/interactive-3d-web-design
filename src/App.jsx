// Import dependency module
import "./App.css";
import {Route, Routes } from "react-router-dom";

// Import alphabatically all the components to be used in the app 
import { About } from './components/About';
import { Anatomy } from './components/Anatomy';
import { AuthProvider } from './components/AuthContext';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import { Levels } from './components/Levels';
import { Login } from './components/Login';
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Reset } from './components/Reset';
import { Scoreboard } from './components/Scoreboard';
import { Signup } from './components/Signup';

function App() {
  return (
    <div className="App">
      {/* AuthProvider is to store varibales globally for the app */}
      <AuthProvider>
        <header>
          <Navbar />
        </header>
        <Routes>
          {/* Public routes in alphabetical order */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/anatomy" element={ <Anatomy />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/scoreboard" element={<Scoreboard />} />
          <Route exact path='/signup' element={<Signup />} />
          {/* Protected routes in alphabatical order */}
          <Route exact path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route exact path="/levels"
            element={
              <ProtectedRoute>
                <Levels />
              </ProtectedRoute>
            } 
          />
          {/* Catch all routes that don't match one of the above */}
          <Route exact path="*" element={<About />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
