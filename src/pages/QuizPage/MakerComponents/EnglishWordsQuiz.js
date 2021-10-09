import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MODIFY_QUIZ } from "../../../reducers/quiz";

const Container = styled.div`
  width: 60%;
  margin-top: 20px;
  background-color: #ecf0f1;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .top {
    display: flex;
    justify-content: space-between;
  }
  .backButton {
    display: flex;
    column-gap: 12px;
    cursor: pointer;
    color: gray;
  }
  .body {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .titleInput {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px;
    font-size: 13px;
    outline: none;
    border: none;
  }

  @media screen and (max-width: 1024px) {
    width: 90%;
  }
`;

function EnglishWordsQuiz() {
  const quizState = useSelector((state) => state.quizState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: MODIFY_QUIZ,
      payload: { ...quizState, quiz: [...quizState.quiz, { title: "hello" }] },
    });
  }, []);

  return (
    <Container>
      <div
        className="top"
        onClick={() =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: { ...quizState, quizType: "", quiz: [] },
          })
        }
      >
        <span className="backButton">
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ transform: "scale(1.5)" }}
          />
          <span>전 단계로 (퀴즈 유형 선택)</span>
        </span>
        <span>영어 단어 퀴즈 만들기</span>
      </div>
      <div className="body">
        <input
          className="titleInput"
          type="text"
          placeholder="퀴즈 이름"
          onChange={(event) =>
            dispatch({
              type: MODIFY_QUIZ,
              payload: { ...quizState, title: event.target.value },
            })
          }
        />
      </div>
    </Container>
  );
}

export default EnglishWordsQuiz;
