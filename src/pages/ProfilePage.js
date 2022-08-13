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
        <div>this is your page</div>
        <PostModal />
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
  min-height: 100vh;
`;

// display: flex;
// flex-direction: column;
// min-height: 100vh;
// background-color: var(--clr-bg-alt);
// margin: 0 2em 2em 2em;
// padding: 1em;
// height: 30em;
// border-radius: 1em;
