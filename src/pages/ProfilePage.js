import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { PostContext } from "../contexts/PostContext";
import { GroupContext } from "../contexts/GroupContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Post from "../components/Post";
import Avatar from "boring-avatars";
import GoogleMapReact, { contextType } from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProfilePage = () => {
  const initialState = {
    title: "",
    body: "",
    sharedWith: [],
    location: null,
    startTime: "",
    endTime: "",
    public: false,
    now: false,
    category: "",
  };

  const { userId } = useParams();
  const { user, currentUser, isAuthenticated, userLocation, setUserLocation } =
    useContext(UserContext);
  const [targetUser, setTargetUser] = useState(null);
  const [targetStatus, setTargetStatus] = useState("loading");
  const [reRender, setReRender] = useState(false);
  const { postFormOpen, setPostFormOpen } = useContext(PostContext);
  const { groups, groupsStatus } = useContext(GroupContext);

  const { postStatus, posts } = useContext(PostContext);
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetch(`https://catch-up-api.herokuapp.com/newpost`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser._id,
        username: currentUser.username,
        location: values.location,
        sharedWith: values.sharedWith,
        title: values.title,
        body: values.body,
        public: values.public,
        startTime: values.startTime,
        endTime: values.endTime,
        now: values.now,
        category: values.category,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const friendRequest = () => {
    fetch(`https://catch-up-api.herokuapp.com/friendrequest`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser._id,
        username: currentUser.username,
        targetUserId: userId,
        targetUsername: targetUser.username,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setReRender(!reRender);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const updateFriend = (update) => {
    fetch(`https://catch-up-api.herokuapp.com/updatefriend`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser._id,
        targetUserId: userId,
        statusUpdate: update,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setReRender(!reRender);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const success = (pos) => {
    setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });

  useEffect(() => {
    fetch(`https://catch-up-api.herokuapp.com/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTargetUser(res.data);
        setTargetStatus("loaded");
      })
      .catch((error) => {
        console.log("error:", error);
        setTargetStatus("error");
      });
  }, [reRender, userId]);

  if (!isAuthenticated) {
    return (
      <Wrapper>
        {" "}
        Loading... if problem persists you may not be authenticated
      </Wrapper>
    );
  }

  // // console.log("user", user);
  // console.log("target", targetUser);
  // // console.log("current", currentUser);

  const friendStatus = targetUser?.friends?.find((friend) => {
    return friend?.friendId === currentUser?._id;
  });

  return (
    <Wrapper>
      <Container>
        {targetStatus === "loaded" ? (
          <Row>
            <Avatar
              size={140}
              name={targetUser.username}
              variant="beam"
              colors={["#E1523D", "#FFAE00", "#FF6B1A", "#006663", "#00B3AD"]}
            />
            <Column>
              <Display style={{ fontWeight: 700 }}>
                {targetUser.username}
              </Display>
              <Display>
                Catch Ups:{" "}
                {
                  posts.filter((post) => {
                    return post.owner === userId;
                  }).length
                }
              </Display>
              <Display>
                Friends:{" "}
                {
                  targetUser.friends.filter(
                    (friend) => friend.status === "Confirmed"
                  ).length
                }
              </Display>
              {/* user is looking at another users account */}
              {targetUser?._id !== currentUser?._id &&
                // some friend status exists
                (friendStatus ? (
                  friendStatus.status === "Confirmed" ? (
                    <Button disabled>You are Friends</Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          if (friendStatus.initiated) {
                            updateFriend("Confirmed");
                          }
                        }}
                        disabled={!friendStatus.initiated}
                      >
                        {friendStatus.initiated
                          ? "Accept Request"
                          : friendStatus.status}
                      </Button>
                      <Display>
                        {friendStatus.initiated
                          ? "This user sent you a friend request!"
                          : `Your friend request is ${friendStatus.status}`}
                      </Display>
                    </>
                  )
                ) : (
                  // no friend status exists
                  <Button onClick={friendRequest}>Add Friend</Button>
                ))}
              {/* user is looking at their own page */}
              {targetUser?._id === currentUser?._id && (
                <Button onClick={() => setPostFormOpen(!postFormOpen)}>
                  {postFormOpen ? "Cancel" : "Post a Catch Up!"}
                </Button>
              )}
            </Column>
          </Row>
        ) : null}
      </Container>

      {/* start of post/map form */}
      {postFormOpen && (
        <FormContainer>
          <Center>
            <Display id="postForm" style={{ marginBottom: 10 }}>
              Choose a point on the map!
            </Display>
          </Center>
          <MapWrapper>
            <GoogleMapReact
              onClick={(e) => {
                setValues({
                  ...values,
                  location: { lat: e.lat, lng: e.lng },
                });
              }}
              defaultZoom={16}
              defaultCenter={userLocation}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              yesIWantToUseGoogleMapApiInternals
            >
              {values.location && (
                <StyledIcon
                  lat={values.location.lat}
                  lng={values.location.lng}
                  text="My Marker"
                />
              )}
            </GoogleMapReact>
          </MapWrapper>
          <Form onSubmit={onSubmit}>
            <Label>Event</Label>
            <Input
              required
              name="title"
              placeholder="What are you up to?"
              value={values.title}
              onChange={onChange}
              defaultValue="Title"
            />

            <Label>Share with</Label>
            <Input
              name="sharedWith"
              value={values.sharedWith}
              onChange={onChange}
              defaultValue=""
            />

            <Label>Public</Label>
            <Input
              type="checkbox"
              name="public"
              value={values.public}
              onChange={(e) => {
                setValues({ ...values, public: e.target.checked });
              }}
            />

            <Label>Start Time</Label>
            <Input
              disabled={values.now}
              name="startTime"
              value={values.startTime}
              onChange={onChange}
              defaultValue=""
            />

            <Label>Now?</Label>
            <Input
              type="checkbox"
              name="now"
              value={values.now}
              onChange={(e) => {
                setValues({ ...values, now: e.target.checked });
              }}
            />

            <Label>End Time</Label>
            <Input
              name="endTime"
              value={values.endTime}
              onChange={onChange}
              defaultValue=""
            />

            <Center>
              <Button onClick={onSubmit}>Submit</Button>
              <Button onClick={() => setPostFormOpen(false)}>Cancel</Button>
            </Center>
          </Form>
        </FormContainer>
      )}

      <Container>
        <Row>
          {targetUser?._id === currentUser?._id ? (
            <PostColumn>
              <ContainerRev>
                <Display>Friends</Display>
                <Ul>
                  {currentUser.friends.map((friend) => {
                    return (
                      <Li>
                        <StyledLink to={`/profile/${friend.friendId}`}>
                          {friend.friendUsername}
                        </StyledLink>
                      </Li>
                    );
                  })}
                </Ul>
              </ContainerRev>
              <ContainerRev>
                <Display>Circles</Display>
                <Ul>
                  {currentUser.circles.map((circle) => {
                    return <Li>{circle}</Li>;
                  })}
                </Ul>
              </ContainerRev>
              <ContainerRev>
                <Display>Groups</Display>
                <Ul>
                  {groupsStatus === "loaded" &&
                    groups
                      .filter((check) => {
                        return check.members.some((el) => {
                          return el.id === currentUser._id;
                        });
                      })
                      .map((group) => {
                        return (
                          <StyledLink to={`/group/${group._id}`}>
                            {group.name}
                          </StyledLink>
                        );
                      })}
                </Ul>
              </ContainerRev>
            </PostColumn>
          ) : friendStatus && friendStatus.status === "Confirmed" ? (
            <PostColumn>
              <ContainerRev>
                <Display>Mutual Friends</Display>
                <Ul>
                  {targetUser.friends
                    .filter((friend) => {
                      return currentUser.friends.some(
                        (el) => el.friendId === friend.friendId
                      );
                    })
                    .map((friend) => {
                      return (
                        <Li>
                          <StyledLink to={`/profile/${friend.friendId}`}>
                            {friend.friendUsername}
                          </StyledLink>
                        </Li>
                      );
                    })}
                </Ul>
              </ContainerRev>
              <ContainerRev>
                <Display>Mutual Groups</Display>
              </ContainerRev>
            </PostColumn>
          ) : null}
          <PostColumn>
            {postStatus === "loaded" &&
            posts.filter((post) => {
              return post.owner === userId;
            }).length
              ? posts
                  .filter((post) => {
                    return post.owner === userId;
                  })
                  .map((post) => {
                    return <Post post={post} key={uuidv4()} />;
                  })
              : "This User has no public posts"}
          </PostColumn>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ProfilePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  background-color: var(--clr-bg-alt);
  margin: 2em 2em 2em 2em;
  padding: 1em;
  border-radius: 1em;
`;

const ContainerRev = styled.div`
  background-color: var(--clr-bg);
  margin: 2em 2em 2em 2em;
  padding: 1em;
  border-radius: 1em;
`;

const FormContainer = styled.div`
  background-color: var(--clr-bg-alt);
  margin: 2em 2em 2em 2em;
  padding: 1em;
  border-radius: 1em;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin: 1em;
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Display = styled.div`
  color: var(--clr-fg);
  margin: 2px;
`;

const MapWrapper = styled.div`
  height: 400px;
`;

const StyledIcon = styled(FaMapMarkerAlt)`
  color: red;
  font-size: 24px;
  transform: translate(-12px, -20px);
`;

const Button = styled.button`
  background: var(--clr-fg);
  color: var(--clr-bg);
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 15px;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: default;
    transform: none;
  }
`;

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--clr-fg-alt);
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--clr-fg-alt);
  background-color: var(--clr-bg);

  &:disabled {
    color: var(--shadow);
    background-color: grey;
  }
`;

const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 3px;
  margin-top: 20px;
  color: white;
  font-size: 14px;
  font-weight: 200;
  color: var(--clr-fg-alt);
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Ul = styled.ul``;

const Li = styled.li`
  margin: 0 0 0 5px;
`;

const StyledLink = styled(Link)`
  &:hover {
    cursor: pointer;
    color: var(--clr-fg-alt);
  }
`;
