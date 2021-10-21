import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor } from "../../../lib/CustomFunctions";
import { MODIFY_QUIZ, SOLVE_QUIZ } from "../../../reducers/quiz";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 10px;
  cursor: pointer;
  input {
    width: 70%;
    font-size: 13px;
    outline: none;
    background: none;
    border: none;
    padding-bottom: 4px;
    border-bottom: 2px solid gray;
  }
  input:hover,
  input:focus {
    border-bottom: 2px solid black;
  }
  @media screen and (max-width: 1024px) {
    input {
      width: 90%;
    }
  }
`;

function EachMultipleOptions({ index, statement, problemIndex }) {
  const dispatch = useDispatch();
  const quizState = useSelector((state) => state.quizState);
  return (
    <Container
      onClick={() => {
        dispatch({
          type: SOLVE_QUIZ,
          index: problemIndex,
          payload: index,
        });
        console.log(index);
      }}
    >
      <div
        style={{
          color:
            quizState.quizSolve[problemIndex].myAnswer === index
              ? getColor("green")
              : "gray",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </div>
      {index + 1}
      <span>{statement}</span>
    </Container>
  );
}

export default EachMultipleOptions;
