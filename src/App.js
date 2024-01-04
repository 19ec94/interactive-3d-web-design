import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import {
  About,
  Login,
  Levels,
  Home,
  Scoreboard,
  Forgot,
} from "./components/pages";

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
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
