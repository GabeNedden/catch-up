import { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import { BiSearchAlt, BiUserCircle } from "react-icons/bi";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [{ themeName, toggleTheme }] = useContext(ThemeContext);
  const { currentUser, status } = useContext(UserContext);

  return (
    <Nav>
      <Ul>
        <Header to="/" className="lobster">
          Catch Up!
        </Header>
      </Ul>
      <Ul>
        <Li>
          <Tab to="mapfeed">
            <BiSearchAlt />
          </Tab>
        </Li>
        {currentUser ? (
          <Li>
            <Tab to={`/profile/${currentUser._id}`}>
              <BiUserCircle />
            </Tab>
          </Li>
        ) : null}

        <Li>
          <LoginButton />
          <LogoutButton />
        </Li>

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
  color: var(--clr-fg);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 24px;

  /* Change the color of links on hover */
  &:hover {
    color: var(--clr-fg);
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
  font-size: 1.5rem;
  color: var(--clr-fg);
  background-color: inherit;
`;

const Header = styled(Link)`
  font-size: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 20px;
  color: var(--clr-primary);
`;

const Li = styled.li`
  color: var(--clr-fg);
`;
