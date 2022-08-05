import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import Navbar from "./components/Navbar";
import GlobalStyles from "./GlobalStyles";
import "./App.css";

function App() {
  const [{ themeName }] = useContext(ThemeContext);
  return (
    <>
      <div className={`${themeName} app`}>
        <Router>
          <GlobalStyles />
          <Navbar />
          <MobileNav />
          <Routes></Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
