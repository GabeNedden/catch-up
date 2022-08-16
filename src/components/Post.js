import { Link } from "react-router-dom";
import Avatar from "boring-avatars";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

/* eslint-disable no-undef */
/* global google */

const Post = ({ post }) => {
  console.log(post);
  return (
    <Wrapper>
      <Row>
        <Avatar
          size={40}
          name={post.username}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
        <StyledLink to={`/profile/${post.owner}`}>{post.username}</StyledLink>
      </Row>
      <Display>{post.title}</Display>
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

      <Display>{post.body}</Display>
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: var(--clr-bg-alt);
  margin: 0 2em 2em 2em;
  padding: 1em;
  height: 30em;
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
  &:hover {
    color: var(--clr-fg-alt);
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
