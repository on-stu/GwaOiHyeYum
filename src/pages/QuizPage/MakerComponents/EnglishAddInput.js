import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { MODIFY_QUIZ } from "../../../reducers/quiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { getColor } from "../../../lib/CustomFunctions";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 45%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 13px;
    outline: none;
    border: none;
  }
  @media screen and (max-width: 1024px) {
    input {
      width: 40%;
    }
  }
`;

function EnglishAddInput({ index, word, meaning }) {
  const quizState = useSelector((state) => state.quizState);
  const dispatch = useDispatch();

  const deleteOne = (index) => {
    const modifiedQuiz = quizState.quiz;
    modifiedQuiz.splice(index, 1);
    return modifiedQuiz;
  };

  return (
    <Container>
      <FontAwesomeIcon
        icon={faTimesCircle}
        style={{ color: getColor("red"), cursor: "pointer" }}
        onClick={() =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: {
              ...quizState,
              quiz: deleteOne(index),
            },
          })
        }
      />
      <span>{index < 9 ? "0" + (index + 1) : index + 1}</span>
      <input
        type="text"
        placeholder="영어 단어"
        value={word}
        onChange={(event) =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: {
              ...quizState,
              quiz: quizState.quiz.map((item, i) =>
                i === index ? { ...item, word: event.target.value } : item
              ),
            },
          })
        }
      />
      <input
        type="text"
        placeholder="뜻"
        value={meaning}
        onChange={(event) =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: {
              ...quizState,
              quiz: quizState.quiz.map((item, i) =>
                i === index ? { ...item, meaning: event.target.value } : item
              ),
            },
          })
        }
      />
    </Container>
  );
}

export default EnglishAddInput;
