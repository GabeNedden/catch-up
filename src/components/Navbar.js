import { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsBicycle, BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext);
  const { currentUser, status } = useContext(UserContext);

  return (
    <Nav>
      <Ul>
        <li>
          <Tab to="/">
            <BsBicycle />
          </Tab>
        </li>
        {currentUser ? (
          <li>
            <Tab to={`/profile/${currentUser._id}`}>{currentUser.username}</Tab>
          </li>
        ) : null}

        <li>
          <Tab to="/">Friends</Tab>
        </li>
        <li>
          <Tab to="/">Groups</Tab>
        </li>
      </Ul>
      <Ul>
        <li>
          <LoginButton />
          <LogoutButton />
        </li>

        <Button type="button" onClick={toggleTheme} aria-label="toggle theme">
          {themeName === "dark" ? <BsSunFill /> : <BsFillMoonStarsFill />}
        </Button>
      </Ul>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background-color: var(--clr-bg-alt);
  display: none;
  align-items: center;
  height: 5em;

  @media only screen and (min-width: 600px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Tab = styled(Link)`
  width: 100%;
  color: var(--clr-primary);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 24px;

  /* Change the color of links on hover */
  &:hover {
    background-color: var(--clr-bg-alt);
    color: var(--clr-fg-alt);
  }

  /* Add a color to the active/current link */
  &:active {
    background-color: var(--clr-primary);
    color: var(--clr-fg);
  }
`;

const Ul = styled.nav`
  display: flex;
  margin-right: 1.5em;
  display: flex;
  list-style-type: none;

  & > * {
    margin-left: 1.5em;
  }
`;

const Button = styled.button`
  display: block;
  font-size: 0.9rem;
  text-transform: lowercase;
  transition: transform 0.2s ease-in-out;
  background-color: inherit;
`;
