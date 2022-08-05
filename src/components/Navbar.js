import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ThemeContext } from "../contexts/ThemeContext";
import styled from "styled-components";

const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext);
  const [showNavList, setShowNavList] = useState(false);

  const toggleNavList = () => setShowNavList(!showNavList);

  return (
    <nav>
      <ul style={{ display: showNavList ? "flex" : "none" }}>
        <li>
          <a href="/">Hello</a>
        </li>
        <li>
          <a href="/">Hello</a>
        </li>
        <li>
          <a href="/">Hello</a>
        </li>
      </ul>

      <button
        type="button"
        onClick={toggleTheme}
        className="center btn btn--icon"
        aria-label="toggle theme"
      >
        {themeName === "dark" ? <BsSunFill /> : <BsFillMoonStarsFill />}
      </button>

      <button
        type="button"
        onClick={toggleNavList}
        className="btn btn--icon nav__hamburger"
        aria-label="toggle navigation"
      >
        {showNavList ? <AiOutlineCloseCircle /> : <AiOutlineMenu />}
      </button>
    </nav>
  );
};

export default Navbar;

const Tab = styled(Link)``;
