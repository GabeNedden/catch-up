import { useContext, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

import { PostContext } from "../contexts/PostContext";

const MapFeed = () => {
  const { currentUser } = useContext(UserContext);
  const { userLocation, setUserLocation } = useContext(UserContext);
  const { publicPosts } = useContext(PostContext);

  return (
    <Wrapper>
      <Header className="lobster">Catch Up!</Header>

      <Center>
        {currentUser ? (
          <SearchBar />
        ) : (
          <Display style={{ marginTop: 20 }}>
            Please sign in to access search and map features...
          </Display>
        )}
      </Center>
      <FormContainer>
        <MapWrapper>
          <GoogleMapReact
            defaultZoom={15}
            defaultCenter={userLocation}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            yesIWantToUseGoogleMapApiInternals
          >
            {publicPosts &&
              publicPosts.length > 0 &&
              publicPosts.map((post) => {
                return (
                  <StyledLink
                    to={`/post/${post._id}`}
                    lat={post.location.lat}
                    lng={post.location.lng}
                  >
                    <StyledIcon />
                  </StyledLink>
                );
              })}
          </GoogleMapReact>
        </MapWrapper>
      </FormContainer>
    </Wrapper>
  );
};

export default MapFeed;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0 0 0;
  color: var(--clr-primary);

  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Display = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: var(--clr-primary);
  margin-bottom: 10px;
`;

const MapWrapper = styled.div`
  height: 400px;
`;

const StyledIcon = styled(FaMapMarkerAlt)`
  color: red;
  font-size: 24px;
  transform: translate(-12px, -20px);
`;

const StyledLink = styled(Link)``;

const FormContainer = styled.div`
  background-color: var(--clr-bg-alt);
  margin: 2em 4em;
  padding: 1em;
  border-radius: 1em;
`;
