import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import BackButton from "../components/BackButton";
import Post from "../components/Post";
import { GroupContext } from "../contexts/GroupContext";
import { PostContext } from "../contexts/PostContext";

const GroupDetails = () => {
  const { groupId } = useParams();
  const { groups, groupsStatus } = useContext(GroupContext);
  const { posts, postStatus } = useContext(PostContext);

  return (
    <Wrapper>
      <Link to="/groups">
        <BackButton />
      </Link>
      <Header className="lobster">Catch Up!</Header>
      {groupsStatus === "loaded" &&
        groups
          .filter((group) => {
            return group._id === groupId;
          })
          .map((group) => {
            return (
              <>
                <Center>
                  <Container style={{ width: "80%" }}>
                    <Center>
                      <Display>{group.name}</Display>
                    </Center>
                  </Container>
                </Center>
                <Row>
                  <Button>Join Group</Button>
                  <Button>Share Catch Up!</Button>
                </Row>
              </>
            );
          })}
      {groupsStatus === "loaded" &&
        postStatus === "loaded" &&
        posts
          .filter((post) => {
            console.log(post.sharedWith);
            return post.sharedWith.includes(groupId);
          })
          .map((post) => {
            return <Post post={post} />;
          })}
    </Wrapper>
  );
};

export default GroupDetails;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const Container = styled.div`
  background-color: var(--clr-bg-alt);
  margin: 2em 2em 1em 2em;
  padding: 1em;
  border-radius: 1em;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: var(--clr-fg);
  color: var(--clr-bg);
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 15px 15px 15px;
  width: 200px;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: default;
    transform: none;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
