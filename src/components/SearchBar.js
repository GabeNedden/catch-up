import { useState } from "react";
import styled from "styled-components";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const handleSelect = (suggestion) => {
    console.log(suggestion);
  };

  const searchable = [
    { title: "hello", categoryId: "ijiji" },
    { title: "test" },
  ];

  return (
    <Wrapper>
      <Container>
        <Input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSelect(event.target.value);
            }
          }}
        />
        <Button onClick={() => setValue("")}>Clear</Button>
      </Container>

      {value.length > 1 && (
        <List>
          {searchable
            .filter((result) => {
              return (
                result.title.toLowerCase().indexOf(value.toLowerCase()) >= 0
              );
            })
            .map((suggestion) => {
              let boldSection = suggestion.title.slice(
                suggestion.title.toLowerCase().indexOf(value.toLowerCase()) +
                  value.length
              );
              let frontSection = suggestion.title.slice(
                0,
                suggestion.title.toLowerCase().indexOf(value.toLowerCase()) +
                  value.length
              );
              return (
                <Suggestion
                  key={suggestion.id}
                  onClick={() => handleSelect(suggestion.title)}
                >
                  <span>
                    {frontSection}
                    <Prediction>{boldSection}</Prediction>
                  </span>
                  <span style={{ fontStyle: "italic", fontSize: "14px" }}>
                    {" "}
                    in{" "}
                    <span
                      style={{ color: "green", textTransform: "capitalize" }}
                    >
                      {suggestion.categoryId}
                    </span>
                  </span>
                </Suggestion>
              );
            })}
        </List>
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
  width: 80%;
  margin-right: 10px;
  border: var(--clr-primary) 1px solid;
  border-radius: 4px;
  padding: 2px;
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
  padding: 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
`;

const Suggestion = styled.li`
  padding: 10px;
  &:hover {
    background-color: beige;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;
