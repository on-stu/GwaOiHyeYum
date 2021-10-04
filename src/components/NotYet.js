import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 32px;
  align-items: center;
  color: gray;
`;

function NotYet({ placeholder }) {
  return (
    <Container>
      <FontAwesomeIcon style={{ color: "gray" }} icon={faSadCry} />
      {placeholder ? <h4>{placeholder}</h4> : <h4>준비중입니다.</h4>}
      <FontAwesomeIcon style={{ color: "gray" }} icon={faSadCry} />
    </Container>
  );
}

export default NotYet;
