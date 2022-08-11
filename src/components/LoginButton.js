import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { BiLogIn } from "react-icons/bi";

const LoginButton = ({ color }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button
        style={color}
        onClick={() => {
          loginWithRedirect();
        }}
      >
        <BiLogIn />
      </Button>
    )
  );
};

export default LoginButton;

const Button = styled.button`
  background: none;
  outline: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  @media (max-width: 600px) {
    right: 40px;
    font-size: 26px;
  }
`;
