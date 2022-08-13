import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiAccountPinCircleLine, RiHomeLine } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";

const links = [
  { name: "test", icon: <RiHomeLine />, path: "/" },
  { name: "test", icon: <TbMap2 />, path: "/" },
  { name: "test", icon: <AiOutlinePlusCircle />, path: "/" },
  { name: "test", icon: <HiOutlineUserGroup />, path: "/" },
  { name: "test", icon: <RiAccountPinCircleLine />, path: "/" },
];

const MobileNav = () => {
  return (
    <Navbar>
      {links.map((link, index) => {
        return (
          <Tab key={index} to={link.path}>
            {link.icon}
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
  height: 66px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;

  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const Tab = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: var(--clr-primary);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 28px;

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
