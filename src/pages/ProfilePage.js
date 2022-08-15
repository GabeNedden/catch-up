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

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, currentUser, isAuthenticated } = useContext(UserContext);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const [targetStatus, setTargetStatus] = useState("loading");
  const [reRender, setReRender] = useState(false);
  const [open, setOpen] = useState(false);

  const { postStatus, posts } = useContext(PostContext);

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
        console.log(res);
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
        console.log(res);
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

  console.log("user", user);
  console.log("target", targetUser);
  console.log("current", currentUser);

  const friendStatus = targetUser?.friends?.find((friend) => {
    return friend?.friendId === currentUser?._id;
  });

  console.log("status", friendStatus);

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
        <Container>
          <MapWrapper>
            <GoogleMapReact
              onClick={(e) => setClickedLocation({ lat: e.lat, lng: e.lng })}
              defaultZoom={16}
              defaultCenter={userLocation}
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              yesIWantToUseGoogleMapApiInternals
            >
              {clickedLocation && (
                <StyledIcon
                  lat={clickedLocation.lat}
                  lng={clickedLocation.lng}
                  text="My Marker"
                />
              )}
            </GoogleMapReact>
          </MapWrapper>
        </Container>
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

  @media only screen and (max-width: 600px) {
    display: none;
  }
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
  margin: 15px 0;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: default;
    transform: none;
  }
`;

const Ul = styled.ul``;

const Li = styled.li``;
