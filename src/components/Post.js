import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { BiSitemap } from "react-icons/bi";

/* eslint-disable no-undef */
/* global google */

const Post = ({ center }) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  console.log(center);

  return (
    <Wrapper>
      <Display>Username!</Display>
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          }}
          defaultZoom={14}
          defaultCenter={center}
        >
          <Test lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      </MapWrapper>

      <Display>Username!</Display>
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

const Display = styled.div`
  color: var(--clr-fg);
`;

const MapWrapper = styled.div`
  height: 400px;
`;

const Test = styled.div`
  background-color: red;
  height: 50px;
  width: 10px;
`;
