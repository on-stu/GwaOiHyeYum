import { faSimplybuilt } from "@fortawesome/free-brands-svg-icons";
import {
  faCircleNotch,
  faFileAlt,
  faList,
  faListOl,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  span {
    width: 25%;
    display: flex;
    column-gap: 4px;
    color: gray;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    span {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

function SpecificTypes({ ox, multiple, simple, writting }) {
  return (
    <Container>
      <span>
        <FontAwesomeIcon icon={faCircleNotch} />
        OX 퀴즈 {ox}문제
      </span>
      <span>
        <FontAwesomeIcon icon={faListOl} />
        객관식 퀴즈 {multiple}문제
      </span>
      <span>
        <FontAwesomeIcon icon={faPen} />
        단답식 퀴즈 {simple}문제
      </span>
      <span>
        <FontAwesomeIcon icon={faFileAlt} />
        서술형 퀴즈 {writting}문제
      </span>
    </Container>
  );
}

export default SpecificTypes;
