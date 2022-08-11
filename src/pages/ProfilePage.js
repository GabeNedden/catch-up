import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, isAuthenticated } = useContext(UserContext);

  console.log(userId);

  if (!isAuthenticated) {
    return (
      <Wrapper>
        {" "}
        Loading... if problem persists you may not be authenticated
      </Wrapper>
    );
  }

  if (userId === user.sub.substring(6)) {
    return (
      <Wrapper>
        <div>This is your profile page</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>{user.sub.substring(6)}</div>
    </Wrapper>
  );
};

export default ProfilePage;

const Wrapper = styled.div`
  height: 100vh;
`;
