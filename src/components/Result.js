import React from "react";
import styled from "styled-components";

const BaseComponent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const NameLabel = styled.h1`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: center;
`;

const TemperatureContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TemperatureLabel = styled.h3`
  margin-left: 15px;
`;

const Result = (props) => {
  return (
    <BaseComponent>
      <NameLabel>{props.data.name}</NameLabel>
      <TemperatureContainer>
        <img
          src={`icons/${props.data.icon}.png`}
          alt="icon"
          width="48"
          height="48"
        ></img>
        <TemperatureLabel>{`${props.data.temp.toFixed()}\xB0C`}</TemperatureLabel>
      </TemperatureContainer>
    </BaseComponent>
  );
};

export default Result;
