import { useState } from "react";
import styled from "styled-components";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const PostModal = () => {
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
    <Wrapper>
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
};

export default PostModal;

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
