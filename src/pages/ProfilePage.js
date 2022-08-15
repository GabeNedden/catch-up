import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Post from "../components/Post";
import Avatar from "boring-avatars";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PostContext } from "../contexts/PostContext";
import PostModal from "../components/PostModal";

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
  const { user, currentUser, isAuthenticated } = useContext(UserContext);
  const [userLocation, setUserLocation] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const [targetStatus, setTargetStatus] = useState("loading");
  const [reRender, setReRender] = useState(false);
  const [open, setOpen] = useState(false);

  const { postStatus, posts } = useContext(PostContext);
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(values);
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
  }, [reRender]);

  if (!isAuthenticated) {
    return (
      <Wrapper>
        {" "}
        Loading... if problem persists you may not be authenticated
      </Wrapper>
    );
  }

  // console.log("user", user);
  // console.log("target", targetUser);
  // console.log("current", currentUser);

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
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            <Column>
              <Display>{targetUser.username}</Display>
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
                    <Button disabled>Friends</Button>
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
                <Button onClick={() => setOpen(!open)}>
                  {open ? "Cancel" : "Post a Catch Up!"}
                </Button>
              )}
            </Column>
          </Row>
        ) : null}
      </Container>

      {/* start of post/map form */}
      {userLocation && open && (
        <FormContainer>
          <MapWrapper>
            <GoogleMapReact
              onClick={(e) => {
                setValues({ ...values, location: { lat: e.lat, lng: e.lng } });
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
            <Label>Title</Label>
            <Input
              required
              name="title"
              value={values.title}
              onChange={onChange}
              defaultValue="Title"
            />

            <Label>Body</Label>
            <Input
              name="body"
              value={values.body}
              onChange={onChange}
              defaultValue="Body"
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
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            </Center>
          </Form>
        </FormContainer>
      )}

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
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin: 2px;
  }
`;

const Display = styled.div`
  color: var(--clr-fg);
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
