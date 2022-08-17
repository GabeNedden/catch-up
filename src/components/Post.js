import { Link } from "react-router-dom";
import Avatar from "boring-avatars";
import styled, { useTheme } from "styled-components";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import moment from "moment";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

/* eslint-disable no-undef */
/* global google */

const Post = ({ post }) => {
  const { currentUser } = useContext(UserContext);
  const [comment, setComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`https://catch-up-api.herokuapp.com/newcomment`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser._id,
        username: currentUser.username,
        postId: post._id,
        comment: comment,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        post.comments.push({
          id: currentUser._id,
          username: currentUser.username,
          body: comment,
        });
        setComment("");
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  const onChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <Wrapper>
      <Row style={{ marginBottom: "15px" }}>
        <Avatar
          size={40}
          name={post.username}
          variant="beam"
          colors={["#E1523D", "#FFAE00", "#FF6B1A", "#006663", "#00B3AD"]}
        />
        <StyledLink to={`/profile/${post.owner}`}>{post.username}</StyledLink>
      </Row>
      <Row style={{ justifyContent: "space-between" }}>
        <Display>{post.title}</Display>
        {post.startTime && (
          <Display>
            {moment(post.startTime).format("MMM Do, YYYY @ h:mm a")}
            {" - "}
            {moment(post.startTime).fromNow()}
          </Display>
        )}
      </Row>
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          defaultZoom={14}
          defaultCenter={post?.location}
          yesIWantToUseGoogleMapApiInternals
        >
          <StyledIcon
            lat={post?.location.lat}
            lng={post?.location.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </MapWrapper>
      <Scroll>
        {post.comments ? (
          post.comments.map((comment) => {
            return (
              <Container>
                <Link to={`/profile/${comment.id}`}>
                  {comment.username}: {comment.body}
                </Link>
              </Container>
            );
          })
        ) : (
          <div>no comments yet...</div>
        )}
      </Scroll>
      <form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="comment"
          value={comment}
          placeholder="leave a comment"
        />
      </form>
    </Wrapper>
  );
};

export default Post;

const Scroll = styled.div`
  max-height: 7em;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--clr-bg);
  border: 3px solid var(--clr-bg-alt);
  margin: 0 2em 2em 2em;
  padding: 1em;

  border-radius: 1em;
`;

const Container = styled.div`
  background-color: var(--clr-bg-alt);
  margin: 0 2em 1em 0;
  padding: 2px 10px;
  border-radius: 1em;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    margin: 5px;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 700;

  &:hover {
    color: var(--clr-fg-alt);
  }
`;

const Display = styled.div`
  color: var(--clr-fg);
`;

const MapWrapper = styled.div`
  height: 400px;
  margin-bottom: 15px;

  @media only screen and (max-width: 600px) {
    height: 300px;
  }
`;

const StyledIcon = styled(FaMapMarkerAlt)`
  color: red;
  font-size: 24px;
  transform: translate(-12px, -20px);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--clr-fg-alt);
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 14px;
  color: var(--clr-fg);
  background-color: var(--clr-bg);

  &:disabled {
    color: var(--shadow);
    background-color: grey;
  }
`;
