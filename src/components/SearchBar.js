import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AllUsersContext } from "../contexts/AllUsersContext";
import { PostContext } from "../contexts/PostContext";
import { GroupContext } from "../contexts/GroupContext";

const SearchBar = () => {
  const { allUsers, allUsersStatus } = useContext(AllUsersContext);
  const { postStatus, posts } = useContext(PostContext);
  const { groups, groupsStatus } = useContext(GroupContext);
  const [value, setValue] = useState("");

  const handleSelect = (suggestion) => {
    console.log(suggestion);
  };

  return (
    <Wrapper>
      <Container>
        <Input
          placeholder="Search for friends, groups, or Catch Ups!"
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              console.log(event.target.value);
            }
          }}
        />
      </Container>

      {value.length > 1 && (
        <>
          <List>
            {allUsersStatus &&
              allUsers
                .filter((result) => {
                  return (
                    result.username
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) >= 0
                  );
                })
                .map((suggestion) => {
                  let boldSection = suggestion.username.slice(
                    suggestion.username
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) + value.length
                  );
                  let frontSection = suggestion.username.slice(
                    0,
                    suggestion.username
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) + value.length
                  );
                  return (
                    <Suggestion
                      to={`/profile/${suggestion._id}`}
                      key={suggestion.id}
                    >
                      <span>
                        {frontSection}
                        <Prediction>{boldSection}</Prediction>
                      </span>
                      <span style={{ fontStyle: "italic", fontSize: "14px" }}>
                        {" "}
                        in{" "}
                        <span
                          style={{
                            color: "green",
                            textTransform: "capitalize",
                          }}
                        >
                          Users
                        </span>
                      </span>
                    </Suggestion>
                  );
                })}
          </List>

          <List>
            {postStatus &&
              posts
                .filter((result) => {
                  return (
                    result.title.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  );
                })
                .map((suggestion) => {
                  let boldSection = suggestion.title.slice(
                    suggestion.title
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) + value.length
                  );
                  let frontSection = suggestion.title.slice(
                    0,
                    suggestion.title
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) + value.length
                  );
                  return (
                    <Suggestion
                      to={`/post/${suggestion._id}`}
                      key={suggestion.id}
                    >
                      <span>
                        {frontSection}
                        <Prediction>{boldSection}</Prediction>
                      </span>
                      <span style={{ fontStyle: "italic", fontSize: "14px" }}>
                        {" "}
                        in{" "}
                        <span
                          style={{
                            color: "green",
                            textTransform: "capitalize",
                          }}
                        >
                          Posts
                        </span>
                      </span>
                    </Suggestion>
                  );
                })}
          </List>

          <List>
            {groupsStatus &&
              groups
                .filter((result) => {
                  return (
                    result.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
                  );
                })
                .map((suggestion) => {
                  let boldSection = suggestion.name.slice(
                    suggestion.name.toLowerCase().indexOf(value.toLowerCase()) +
                      value.length
                  );
                  let frontSection = suggestion.name.slice(
                    0,
                    suggestion.name.toLowerCase().indexOf(value.toLowerCase()) +
                      value.length
                  );
                  return (
                    <>
                      <Suggestion
                        to={`/group/${suggestion._id}`}
                        key={suggestion._id}
                      >
                        <span>
                          {frontSection}
                          <Prediction>{boldSection}</Prediction>
                        </span>
                        <span style={{ fontStyle: "italic", fontSize: "14px" }}>
                          {" "}
                          in{" "}
                          <span
                            style={{
                              color: "green",
                              textTransform: "capitalize",
                            }}
                          >
                            Groups
                          </span>
                        </span>
                      </Suggestion>
                      <Suggestion to={"/groups"}>See All Groups</Suggestion>
                    </>
                  );
                })}
          </List>
        </>
      )}
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-top: 15px;
  margin-bottom: -10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 10px 0;
`;

const Input = styled.input`
  width: 100%;
  margin-right: 10px;
  color: var(--clr-white);
  background-color: var(--clr-bg-alt);
  border: var(--clr-primary) 1px solid;
  border-radius: 4px;
  padding: 8px;
  &:focus {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
`;

const Button = styled.button`
  width: 20%;
  height: 30px;
  background-color: var(--clr-fg-alt);
  color: var(--clr-bg);
  font-weight: 600;
  border-radius: 4px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
`;

const Suggestion = styled(Link)`
  padding: 10px;
  &:hover {
    background-color: beige;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;
