import React from "react";
import styled from "styled-components";
import Post from "../components/Post";

const MainFeed = () => {
  return (
    <Wrapper>
      <div style={{ padding: "1em 0" }} />
      <Post center={{ lat: 40, lng: -84 }} />
      <Post center={{ lat: 40, lng: -84 }} />
      <Post center={{ lat: 40, lng: -84 }} />
    </Wrapper>
  );
};

export default MainFeed;

const Wrapper = styled.div`
  height: 100%;
`;
