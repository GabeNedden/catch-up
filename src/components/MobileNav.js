import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiSmile } from "react-icons/bi";

const links = [
  { name: "test", path: "/" },
  { name: "test", path: "/" },
  { name: "test", path: "/" },
  { name: "test", path: "/" },
];

const MobileNav = () => {
  return (
    <Navbar>
      {links.map((link, index) => {
        return (
          <Tab key={index} to={link.path}>
            <BiSmile />
          </Tab>
        );
      })}
    </Navbar>
  );
};

export default MobileNav;

const Navbar = styled.div`
  display: flex;
  background-color: var(--clr-bg-alt);
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;

  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const Tab = styled(Link)`
  width: 100%;
  color: var(--clr-primary);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;

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
