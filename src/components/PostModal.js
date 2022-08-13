import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const PostModal = () => {
  const { userId } = useParams();
  const { user, currentUser, isAuthenticated } = useContext(UserContext);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);

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
    <Dialog open={true}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--clr-bg-alt);
  border-radius: 1em;
`;

const MapWrapper = styled.div`
  height: 400px;
`;

const StyledIcon = styled(FaMapMarkerAlt)`
  color: red;
  font-size: 24px;
  transform: translate(-12px, -20px);
`;
