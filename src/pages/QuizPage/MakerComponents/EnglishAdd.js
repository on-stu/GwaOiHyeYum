import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
  column-gap: 10px;
  color: gray;
  cursor: pointer;
`;

function EnglishAdd({ onClick }) {
  return (
    <Container onClick={onClick}>
      <span>새 단어 추가하기</span>
      <FontAwesomeIcon icon={faPlusCircle} />
    </Container>
  );
}

export default EnglishAdd;
