import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiAccountPinCircleLine, RiHomeLine } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";

import PostModal from "./PostModal";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const MobileNav = () => {
  const { currentUser, status } = useContext(UserContext);

  return (
    <Navbar>
      {currentUser && (
        <>
          <Tab to="/">
            <RiHomeLine />
          </Tab>
          <Tab to="/mapfeed">
            <TbMap2 />
          </Tab>

          <PostModal />

          <Tab to="/groups">
            <HiOutlineUserGroup />
          </Tab>
          <Tab to={`/profile/${currentUser?._id}`}>
            <RiAccountPinCircleLine />
          </Tab>
        </>
      )}
      {!currentUser && (
        <Tab to="/">
          <LoginButton />
        </Tab>
      )}
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
