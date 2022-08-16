import { useContext } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { AllUsersContext } from "../contexts/AllUsersContext";
import { PostContext } from "../contexts/PostContext";
import { GroupContext } from "../contexts/GroupContext";

const MapFeed = () => {
  const { allUsers, allUsersStatus } = useContext(AllUsersContext);
  const { postStatus, posts } = useContext(PostContext);
  const { groups, groupsStatus } = useContext(GroupContext);
  return (
    <Wrapper>
      <Header className="lobster">Catch Up!</Header>
      <Center>
        <Display>Search</Display>
        <SearchBar
          users={allUsersStatus === "loaded" ? allUsers : false}
          posts={postStatus === "loaded" ? posts : false}
          groups={groupsStatus === "loaded" ? groups : false}
        />
      </Center>
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
