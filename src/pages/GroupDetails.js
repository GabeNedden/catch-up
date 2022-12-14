import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import BackButton from "../components/BackButton";
import Post from "../components/Post";
import { GroupContext } from "../contexts/GroupContext";
import { PostContext } from "../contexts/PostContext";
import { UserContext } from "../contexts/UserContext";

const GroupDetails = () => {
  const { groupId } = useParams();
  const { groups, groupsStatus } = useContext(GroupContext);
  const { posts, postStatus, setPostFormOpen } = useContext(PostContext);

  const { currentUser } = useContext(UserContext);
  const [thisGroup, setThisGroup] = useState(null);
  const [member, setMember] = useState(false);

  const joinGroup = (e) => {
    e.preventDefault();
    fetch(`https://catch-up-api.herokuapp.com/joingroup`, {
      method: "PUT",
      body: JSON.stringify({
        userId: currentUser._id,
        username: currentUser.username,
        groupId: groupId,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMember(true);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  useEffect(() => {
    if (groupsStatus === "loaded" && currentUser) {
      setThisGroup(
        groups.find((group) => {
          return group._id === groupId;
        })
      );
    }
  }, [currentUser, groupsStatus, member]);

  useEffect(() => {
    if (thisGroup) {
      setMember(
        thisGroup.members.filter((el) => el.id === currentUser._id).length > 0
      );
    }
  }, [thisGroup]);

  return (
    <Wrapper>
      <Link to="/groups">
        <BackButton />
      </Link>
      <Header className="lobster">Catch Up!</Header>
      {thisGroup && (
        <>
          <Center>
            <Container style={{ width: "80%" }}>
              <Center>
                <Display>{thisGroup.name}</Display>
              </Center>
            </Container>
          </Center>
          <Row>
            {member ? (
              <Button disabled>Joined</Button>
            ) : (
              <Button onClick={joinGroup}>Join</Button>
            )}

            <HashButton smooth to={`/profile/${currentUser?._id}#postForm`}>
              Share Catch Up!
            </HashButton>
          </Row>
        </>
      )}
      {thisGroup && postStatus === "loaded" && member ? (
        <Row>
          <PostColumn>
            <Display style={{ margin: "0 0 -30px 50px" }}>
              Group Members
            </Display>
            <Container>
              <Ul>
                {thisGroup.members.map((member) => {
                  return (
                    <Li>
                      <StyledLink to={`/profile/${member.id}`}>
                        {member.username}
                      </StyledLink>
                    </Li>
                  );
                })}
              </Ul>
            </Container>
          </PostColumn>
          <PostColumn style={{ marginTop: "30px" }}>
            {posts
              .filter((post) => {
                return post.sharedWith.includes(groupId);
              })
              .map((post) => {
                return <Post post={post} />;
              })}
          </PostColumn>
        </Row>
      ) : currentUser ? (
        <Center>
          <Display style={{ marginTop: 20 }}>
            Join the group to see the Catch Ups!
          </Display>
        </Center>
      ) : (
        <Center>
          <Display style={{ marginTop: 20 }}>
            Sign on for more features!
          </Display>
        </Center>
      )}
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

const PostColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const HashButton = styled(HashLink)`
  background: var(--clr-fg);
  color: var(--clr-bg);
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 0 15px 15px 15px;
  width: 200px;
  text-align: center;

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

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  list-style-type: none;
  margin: 0 0 0 5px;
`;

const StyledLink = styled(Link)`
  &:hover {
    cursor: pointer;
    color: var(--clr-fg-alt);
  }
`;
