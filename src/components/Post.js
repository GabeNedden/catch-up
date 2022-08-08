import React, { useState } from "react";
import styled from "styled-components";

import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

/* eslint-disable no-undef */
/* global google */

const Post = () => {
  const [map, setMap] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "",
  });

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (loadError) {
    console.log(loadError);
    return loadError;
  }
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Wrapper>
      <GoogleMap
        zoom={2}
        center={center}
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        onUnmount={onUnmount}
      ></GoogleMap>
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
