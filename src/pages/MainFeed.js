import React, { useContext } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { PostContext } from "../contexts/PostContext";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "../components/SearchBar";
import { AllUsersContext } from "../contexts/AllUsersContext";
import { GroupContext } from "../contexts/GroupContext";
import { UserContext } from "../contexts/UserContext";

const MainFeed = () => {
  const { currentUser } = useContext(UserContext);
  const { allUsers, allUsersStatus } = useContext(AllUsersContext);
  const { sharedPosts, postStatus, posts, publicPosts, publicPostStatus } =
    useContext(PostContext);
  const { groups, groupsStatus } = useContext(GroupContext);

  return (
    <Wrapper>
      <Header className="lobster">Catch Up!</Header>

      {postStatus !== "loaded" && (
        <Center style={{ marginTop: 10 }}>
          <Display>Public Posts</Display>
          <p>Sign in to discover events, groups, and friends near you.</p>
        </Center>
      )}

      {!currentUser &&
        publicPosts &&
        publicPosts.length &&
        publicPosts.map((post) => {
          return <Post post={post} key={uuidv4()} />;
        })}

      <div style={{ padding: "1em 0" }} />
      {sharedPosts &&
        sharedPosts.length &&
        sharedPosts.map((post) => {
          return <Post post={post} key={uuidv4()} />;
        })}
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

const Display = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: var(--clr-primary);
  margin-bottom: 10px;
`;
