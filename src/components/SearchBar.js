import { useState } from "react";
import styled from "styled-components";
import { Cities } from "../data";

const BaseComponent = styled.div`
  display: flex;
  width: 550px;
  flex-direction: column;
`;

const InputField = styled.input`
  displey: flex;
  height: 40px;
`;

const List = styled.ul`
  border: 1px solid #999;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  height: auto;
  padding-left: 0px;
  width: 548px;
`;

const ListItem = styled.li`
  padding-top: 5px;
  padding-bottom: 5px;
  &:hover {
    background-color: #e0d3d3;
    cursor: pointer;
    font-weight: 700;
  }
`;

export default function SearchBar({ getInputText }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestedList, setSuggestedList] = useState([]);

  const filterSuggestions = (text) =>
    setSuggestedList(
      Cities.filter(
        (city) => city.toLowerCase().indexOf(text.toLowerCase()) > -1,
      ),
    );

  const inputChanged = (e) => {
    setInputValue(e.target.value);
    getInputText(e.target.value);
    filterSuggestions(e.target.value);
  };

  return (
    <BaseComponent>
      <InputField
        type="text"
        value={inputValue}
        onChange={inputChanged}
        placeholder="Your City"
      />
      {inputValue && suggestedList.length !== 0 ? (
        <List>
          {suggestedList.slice(0, 6).map((city) => (
            <ListItem
              key={city}
              onClick={(e) => {
                setInputValue(e.target.textContent);
                getInputText(e.target.textContent);
                setSuggestedList([]);
              }}
            >
              {city}
            </ListItem>
          ))}
        </List>
      ) : null}
    </BaseComponent>
  );
}
