import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BackButton = () => {
  return (
    <Fixed>
      <BiArrowBack />
    </Fixed>
  );
};

export default BackButton;

const Fixed = styled.div`
  position: fixed;
  left: 10px;
  color: var(--clr-primary);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 24px;
  background-color: inherit;

  /* Change the color of links on hover */
  &:hover {
    color: var(--clr-fg);
  }

  /* Add a color to the active/current link */
  &:active {
    color: var(--clr-fg);
  }

  @media only screen and (min-width: 600px) {
    display: none;
  }
`;
