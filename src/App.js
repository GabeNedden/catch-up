import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import Navbar from "./components/Navbar";
import GlobalStyles from "./GlobalStyles";
import "./App.css";
import MainFeed from "./pages/MainFeed";
import ProfilePage from "./pages/ProfilePage";
import MapFeed from "./pages/MapFeed";
import GroupsPage from "./pages/GroupsPage";

function App() {
  const [{ themeName }] = useContext(ThemeContext);
  return (
    <>
      <div className={`${themeName} app`}>
        <Router>
          <GlobalStyles />
          <Navbar />
          <MobileNav />
          <Routes>
            <Route exact path="/" element={<MainFeed />} />
            <Route exact path="/mapfeed" element={<MapFeed />} />
            <Route exact path="/" element={<MainFeed />} />
            <Route exact path="/groups" element={<GroupsPage />} />
            <Route exact path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
