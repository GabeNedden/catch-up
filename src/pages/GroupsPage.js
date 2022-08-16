import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { GroupContext } from "../contexts/GroupContext";

const GroupsPage = () => {
  const initialState = {
    admins: [],
    groupName: "",
    members: [],
  };
  const [values, setValues] = useState(initialState);
  const { currentUser } = useContext(UserContext);
  const { groups, groupsStatus } = useContext(GroupContext);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    fetch(`https://catch-up-api.herokuapp.com/newgroup`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser._id,
        groupName: values.groupName,
        admins: values.admins,
        members: values.members,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <Wrapper>
      <Header className="lobster">Catch Up!</Header>
      <Center>
        <Display>Groups</Display>
      </Center>

      <FormContainer>
        <Form>
          <Label>New Group Name</Label>
          <Input
            name="groupName"
            value={values.groupName}
            onChange={onChange}
            defaultValue=""
          />

          <Label>Invite Admins</Label>
          <Input
            disabled
            name="admins"
            value={values.admins}
            onChange={onChange}
            defaultValue=""
          />

          <Label>Invite Members</Label>
          <Input
            disabled
            name="members"
            value={values.members}
            onChange={onChange}
            defaultValue=""
          />

          <Button onClick={onSubmit}>Submit</Button>
        </Form>
      </FormContainer>
      {groupsStatus &&
        groups.map((group) => {
          console.log(group);
        })}
    </Wrapper>
  );
};

export default GroupsPage;

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

const FormContainer = styled.div`
  background-color: var(--clr-bg-alt);
  margin: 2em 2em 2em 2em;
  padding: 1em;
  border-radius: 1em;
`;

const Form = styled.form`
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  border-radius: 4px;
  border: 1px solid var(--clr-fg-alt);
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--clr-fg-alt);
  background-color: var(--clr-bg);

  &:disabled {
    color: var(--shadow);
    background-color: var(--clr-bg-alt);
    border: 1px solid var(--clr-bg);
  }
`;

const Label = styled.label`
  line-height: 2;
  text-align: left;
  display: block;
  margin-bottom: 3px;
  margin-top: 20px;
  color: white;
  font-size: 14px;
  font-weight: 200;
  color: var(--clr-fg-alt);
`;

const Button = styled.button`
  background: var(--clr-fg);
  color: var(--clr-bg);
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 15px;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    cursor: default;
    transform: none;
  }
`;
