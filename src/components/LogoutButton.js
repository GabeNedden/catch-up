import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";

const LogoutButton = ({ color }) => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Button style={color} onClick={() => logout()}>
        <BiLogOut />
      </Button>
    )
  );
};

export default LogoutButton;

const Button = styled.button`
  position: absolute;
  background: none;
  outline: none;
  border: none;
  top: 50px;
  right: 66px;
  font-size: 30px;
  cursor: pointer;
  @media (max-width: 600px) {
    right: 40px;
    font-size: 26px;
  }
`;
