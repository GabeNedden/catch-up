import React, { useContext } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { PostContext } from "../contexts/PostContext";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "../components/SearchBar";
import { AllUsersContext } from "../contexts/AllUsersContext";
import { GroupContext } from "../contexts/GroupContext";

const MainFeed = () => {
  const { allUsers, allUsersStatus } = useContext(AllUsersContext);
  const { postStatus, posts } = useContext(PostContext);
  const { groups, groupsStatus } = useContext(GroupContext);

  return (
    <Wrapper>
      <Header className="lobster">Catch Up!</Header>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  font-size: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0 0 0;
  color: var(--clr-primary);

  @media only screen and (min-width: 600px) {
    display: none;
  }
`;
