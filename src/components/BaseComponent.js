import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import History from "../History.js";
import SearchBar from "./SearchBar.js";
import Result from "./Result";
import Weather from "../weather.svg";
import styled from "styled-components";
import { createPath } from "history";

const BaseComponent = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 33px;
`;

const SearchComponent = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 650px;
  margin-top: 50px;
`;

const SearchButton = styled.button`
  width: 80px;
  height: 40px;
`;

const ResultComponent = styled.div`
  display: flex;
  width: 800px;
  height: 100px;
  margin-top: 20px;
`;

const apiCall = (word) => {
  return fetch("http://localhost:8081/search", {
    method: "GET",
    headers: { word: word },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

const SearchScreen = (props) => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city");
    const icon = params.get("icon");
    const temp = params.get("temp");
    if (city || icon || temp) {
      setData({ name: city, icon: icon, temp: Number(temp) });
    }
  }, []);

  useEffect(() => {
    if (data) {
      const location = {
        pathname: "/",
        search: `?city=${data.name}&icon=${data.icon}&temp=${data.temp}`,
      };
      createPath(location);
      History.push(location);
    }
  }, [data]);

  const searchButtonClicked = async (e) => {
    e.preventDefault();
    const data = await apiCall(inputText);
    setData({
      name: data.name,
      icon: data.weather[0].icon,
      temp: data.main.temp,
    });
  };

  return (
    <div>
      <BaseComponent>
        <img src={Weather} alt="weather" width="200" height="200" />
        <SearchComponent onSubmit={searchButtonClicked}>
          <SearchBar getInputText={setInputText} />
          <SearchButton type="submit">Search</SearchButton>
        </SearchComponent>
        {data ? (
          <ResultComponent>
            <Result data={data} />
          </ResultComponent>
        ) : null}
      </BaseComponent>
    </div>
  );
};

export default SearchScreen;
