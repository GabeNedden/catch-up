import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { RiAccountPinCircleLine, RiHomeLine } from "react-icons/ri";
import { TbMap2 } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlinePlusCircle, AiFillMinusCircle } from "react-icons/ai";

import PostModal from "./PostModal";
import LoginButton from "./LoginButton";

const MobileNav = () => {
  const { currentUser, status } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  return (
    <Navbar>
      {open && <PostModal currentUser={currentUser} />}
      {currentUser && (
        <>
          <Tab
            to="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            <RiHomeLine />
          </Tab>

          <Tab
            to="/mapfeed"
            onClick={() => {
              setOpen(false);
            }}
          >
            <TbMap2 />
          </Tab>

          <PostTab
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <AiFillMinusCircle /> : <AiOutlinePlusCircle />}
          </PostTab>

          <Tab
            to="/groups"
            onClick={() => {
              setOpen(false);
            }}
          >
            <HiOutlineUserGroup />
          </Tab>
          <Tab
            to={`/profile/${currentUser?._id}`}
            onClick={() => {
              setOpen(false);
            }}
          >
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
  z-index: 99;

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

  &:hover {
    background-color: var(--clr-bg-alt);
    color: var(--clr-fg-alt);
  }

  &:active {
    background-color: var(--clr-primary);
    color: var(--clr-fg);
  }
`;

const PostTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: var(--clr-primary);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 28px;

  &:hover {
    cursor: pointer;
    background-color: var(--clr-bg-alt);
    color: var(--clr-fg-alt);
  }

  &:active {
    background-color: var(--clr-primary);
    color: var(--clr-fg);
  }
`;
