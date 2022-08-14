import React, { useContext } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { PostContext } from "../contexts/PostContext";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "../components/SearchBar";

const MainFeed = () => {
  const { postStatus, posts } = useContext(PostContext);

  return (
    <Wrapper>
      <Center>
        <SearchBar />
      </Center>
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
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
