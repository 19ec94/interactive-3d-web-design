import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { About, Login, Levels, Home, Scoreboard } from "./components/pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </div>
  );
}

export default App;
