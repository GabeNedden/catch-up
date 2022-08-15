import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

/* eslint-disable no-undef */
/* global google */

const Post = ({ post }) => {
  return (
    <Wrapper>
      <Display>{post.username}</Display>
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
  max-width: 600px;
  background-color: var(--clr-bg-alt);
  margin: 0 2em 2em 2em;
  padding: 1em;
  height: 30em;
  border-radius: 1em;
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
