import { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import PostModal from "../components/PostModal";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user, currentUser, isAuthenticated } = useContext(UserContext);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);

  // console.log("userId:", userId);
  // console.log("user:", user);
  // console.log("currentUser:", currentUser);

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

  if (!isAuthenticated) {
    return (
      <Wrapper>
        {" "}
        Loading... if problem persists you may not be authenticated
      </Wrapper>
    );
  }

  if (userId === currentUser?._id) {
    return (
      <Wrapper>
        <PostModal />
        <div style={{ padding: "1em 0" }} />

        {userLocation && (
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
        )}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>{user.sub.substring(6)}</div>
    </Wrapper>
  );
};

export default ProfilePage;

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

const StyledIcon = styled(FaMapMarkerAlt)`
  color: red;
  font-size: 24px;
  transform: translate(-12px, -20px);
`;
