import styled from "styled-components";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";

/* eslint-disable no-undef */
/* global google */

const Post = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBuYKwfR1Ka0MG-GQo4nuAOTKC8xI-aVi4",
  });

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;

    console.log(
      `Your current position is: Latitude : ${crd.latitude}, Longitude: ${crd.longitude}`
    );

    setCenter({
      lat: crd.latitude,
      lng: crd.longitude,
    });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  if (loadError) {
    console.log(loadError);
    return loadError;
  }
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Wrapper>
      <GoogleMap
        zoom={4}
        center={center}
        mapContainerStyle={containerStyle}
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
