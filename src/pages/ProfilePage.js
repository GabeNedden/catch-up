import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { PostContext } from "../contexts/PostContext";
import { GroupContext } from "../contexts/GroupContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DateTimePicker from "react-datetime-picker";

import Post from "../components/Post";
import Avatar from "boring-avatars";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProfilePage = () => {
  const initialState = {
    title: "",
    body: "",
    sharedWith: [],
    location: null,
    startTime: new Date(),
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
  const { groups, groupsStatus, myGroups } = useContext(GroupContext);

  const { postStatus, posts } = useContext(PostContext);
  const [values, setValues] = useState(initialState);

  const [shareArray, setShareArray] = useState([]);
  const [checkedState, setCheckedState] = useState();
  const [groupArray, setGroupArray] = useState([]);
  const [checkedGroup, setCheckedGroup] = useState();

  useEffect(() => {
    if (currentUser) {
      setCheckedState(new Array(currentUser.friends?.length).fill(false));
      if (myGroups) {
        console.log("first", myGroups);
        setCheckedGroup(new Array(myGroups.length).fill(false));
      }
    }
  }, [currentUser, myGroups]);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const dateChange = (value) => {
    setValues({ ...values, startTime: value });
  };

  const resetDate = () => {
    setValues({ ...values, startTime: new Date() });
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    let totalShare = [];
    updatedCheckedState.forEach((cur, index) => {
      if (cur === true) {
        totalShare.push(currentUser.friends[index].friendId);
      }
    });

    setShareArray(totalShare);
    console.log("total", totalShare);
  };

  const handleGroupChange = (position) => {
    const updatedCheckedState = checkedGroup.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedGroup(updatedCheckedState);

    let totalShare = [];
    updatedCheckedState.forEach((cur, index) => {
      if (cur === true) {
        totalShare.push(myGroups[index]._id);
      }
    });

    setGroupArray(totalShare);
    console.log("total", totalShare);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetch(`https://catch-up-api.herokuapp.com/newpost`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser._id,
        username: currentUser.username,
        location: values.location,
        sharedWith: [...shareArray, ...groupArray],
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
        setPostFormOpen(false);
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
        <Center>
          <Display style={{ marginTop: 20 }}>
            Please sign up to see Profile details
          </Display>
        </Center>
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
                  targetUser?.friends.filter(
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
      {postFormOpen && currentUser._id === userId && (
        <FormContainer>
          <Center>
            <Display id="postForm" style={{ marginBottom: 10 }}>
              Choose a point on the map!
            </Display>
          </Center>
          <MapWrapper>
            <GoogleMapReact
              required
              onClick={(e) => {
                setValues({
                  ...values,
                  location: { lat: e.lat, lng: e.lng },
                });
              }}
              defaultZoom={14}
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

            <RowVar>
              <Label>Public</Label>
              <Input
                type="checkbox"
                name="public"
                value={values.public}
                onChange={(e) => {
                  setValues({ ...values, public: e.target.checked });
                }}
              />
            </RowVar>

            <Label>Start Time</Label>
            <DateTimePicker
              style={{ width: "100%" }}
              required
              minDate={new Date()}
              calendarIcon={null}
              disableClock={true}
              yearPlaceholder="yyyy"
              minutePlaceholder="mm"
              hourPlaceholder="hh"
              onChange={dateChange}
              name="startTime"
              value={values.startTime}
            />
            <Button
              type="button"
              style={{ padding: " 5px 10px" }}
              onClick={resetDate}
            >
              Now
            </Button>

            <Label>Share with</Label>
            {currentUser.friends.map(({ friendId, friendUsername }, index) => {
              return (
                <Li key={index}>
                  <div>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={friendUsername}
                      value={friendId}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                    <label
                      htmlFor={`custom-checkbox-${index}`}
                      style={{ marginLeft: 10 }}
                    >
                      {friendUsername}
                    </label>
                  </div>
                </Li>
              );
            })}
            {myGroups &&
              myGroups.length > 0 &&
              myGroups.map(({ _id, name }, index) => {
                return (
                  <Li key={index}>
                    <div>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={_id}
                        checked={checkedGroup[index]}
                        onChange={() => handleGroupChange(index)}
                      />
                      <label
                        htmlFor={`custom-checkbox-${index}`}
                        style={{ marginLeft: 10 }}
                      >
                        {name} - Group
                      </label>
                    </div>
                  </Li>
                );
              })}

            <Center>
              <Button
                disabled={
                  !(
                    values.location &&
                    values.title &&
                    (shareArray.length || groupArray.length || values.public)
                  )
                }
                onClick={onSubmit}
              >
                Submit
              </Button>
              <Button onClick={() => setPostFormOpen(false)}>Cancel</Button>
            </Center>
          </Form>
        </FormContainer>
      )}

      <Container>
        <Row>
          {targetUser?._id === currentUser?._id ? (
            <PostColumn>
              <Display style={{ margin: "0 0 -30px 50px" }}>Friends</Display>
              <ContainerRev>
                <MobileDisplay>Friends</MobileDisplay>
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

              {/* <Display style={{ margin: "0 0 -30px 50px" }}>Circles</Display>
              <ContainerRev>
                <MobileDisplay>Circles</MobileDisplay>
                <Ul>
                  {currentUser.circles.map((circle) => {
                    return <Li>{circle}</Li>;
                  })}
                </Ul>
              </ContainerRev> */}

              <Display style={{ margin: "0 0 -30px 50px" }}>Groups</Display>
              <ContainerRev>
                <MobileDisplay>Groups</MobileDisplay>
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
              <Display style={{ margin: "0 0 -30px 50px" }}>
                Mutual Friends
              </Display>
              <ContainerRev>
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
                  {targetUser.friends.filter((friend) => {
                    return currentUser.friends.some(
                      (el) => el.friendId === friend.friendId
                    );
                  }).length > 0 ? null : (
                    <Li>none</Li>
                  )}
                </Ul>
              </ContainerRev>
              <Display style={{ margin: "0 0 -30px 50px" }}>
                Mutual Groups
              </Display>
              <ContainerRev>
                <Ul>none</Ul>
              </ContainerRev>
            </PostColumn>
          ) : null}
          <PostColumn style={{ alignSelf: "center" }}>
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

  @media only screen and (max-width: 600px) {
    margin: 0;
    padding: 0;
    background-color: var(--clr-bg-alt);
  }
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

const RowVar = styled.div`
  display: block;
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
  font-weight: 700;
  font-size: 22px;
  color: var(--clr-fg);
  margin: 2px;
`;

const MobileDisplay = styled.div`
  display: none;
  font-weight: 700;
  font-size: 22px;

  @media only screen and (max-width: 600px) {
    display: block;
  }
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
  background-color: var(--clr-fg-alt);
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
    background-color: var(--clr-fg);
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
  color: var(--clr-fg);
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
  font-size: 18px;
  font-weight: 700;
  color: var(--clr-fg);
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
