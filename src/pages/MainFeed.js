import React, { useContext } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { PostContext } from "../contexts/PostContext";
import { v4 as uuidv4 } from "uuid";

const MainFeed = () => {
  const { postStatus, posts } = useContext(PostContext);

  return (
    <Wrapper>
      <div style={{ padding: "1em 0" }} />
      {postStatus === "loaded" ? (
        posts.map((post) => {
          return <Post post={post} key={uuidv4()} />;
        })
      ) : (
        <div>loading</div>
      )}
    </Wrapper>
  );
};

export default MainFeed;

const Wrapper = styled.div`
  min-height: 100vh;
`;
