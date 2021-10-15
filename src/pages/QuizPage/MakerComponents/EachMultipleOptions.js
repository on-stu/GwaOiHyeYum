import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor } from "../../../lib/CustomFunctions";
import { MODIFY_QUIZ } from "../../../reducers/quiz";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 10px;
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
    <Container>
      <div
        onClick={() =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: {
              ...quizState,
              quiz: quizState.quiz.map((item, i) =>
                i === problemIndex ? { ...item, answer: index } : item
              ),
            },
          })
        }
        style={{
          color:
            quizState.quiz[problemIndex].answer === index
              ? getColor("green")
              : "gray",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </div>
      {index + 1}
      <input
        type="text"
        placeholder="선지를 적어주세요."
        value={statement}
        onChange={(event) =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: {
              ...quizState,
              quiz: quizState.quiz.map((item, i) =>
                i === problemIndex
                  ? {
                      ...item,
                      options: item.options.map((option, j) =>
                        j === index ? event.target.value : option
                      ),
                    }
                  : item
              ),
            },
          })
        }
      />
    </Container>
  );
}

export default EachMultipleOptions;
