import { useState } from "react";
import styled from "styled-components";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

const PostModal = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <PostTab
        onClick={() => {
          setOpen(!open);
        }}
      >
        <AiOutlinePlusCircle>New Catch Up!</AiOutlinePlusCircle>
      </PostTab>

      {userLocation && open && (
        <Wrapper>
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
        </Wrapper>
      )}
    </>
  );
};

export default PostModal;

const Wrapper = styled.div`
  position: fixed;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  overflow: auto;
  padding: 15px;

  background-color: var(--clr-bg);
  border: 1px solid red;
  border-radius: 10px;
  height: 90vh;
`;

const MapWrapper = styled.div`
  width: 90%;
  height: 400px;
  margin: auto;
`;

const StyledIcon = styled(FaMapMarkerAlt)`
  color: red;
  font-size: 24px;
  transform: translate(-12px, -20px);
`;

const PostTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: var(--clr-primary);
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 28px;

  /* Change the color of links on hover */
  &:hover {
    cursor: pointer;
    background-color: var(--clr-bg-alt);
    color: var(--clr-fg-alt);
  }

  /* Add a color to the active/current link */
  &:active {
    background-color: var(--clr-primary);
    color: var(--clr-fg);
  }
`;
