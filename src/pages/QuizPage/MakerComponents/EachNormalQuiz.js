import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OButton, XButton } from "../../../components/OXButtons";
import TextArea from "../../../components/TextArea";
import { getColor } from "../../../lib/CustomFunctions";
import { MODIFY_QUIZ } from "../../../reducers/quiz";
import EachMultipleOptions from "./EachMultipleOptions";

const EachContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .Eachtop {
    display: flex;
    justify-content: flex-start;
    column-gap: 10px;
    align-items: center;
  }
  .Eachtop > span {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }
  .body {
    display: flex;
    flex-direction: row !important;
    padding-top: 10px;
    padding-right: 16px;
    padding-left: 16px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
  }
  .oxInput {
    width: 85%;
    padding: 10px;
    box-sizing: border-box;
    height: 44px;
    border-radius: 10px;
    font-size: 13px;
    outline: none;
    border: none;
  }
  .simpleInput {
    width: 48%;
    padding: 10px;
    box-sizing: border-box;
    height: 44px;
    border-radius: 10px;
    font-size: 13px;
    outline: none;
    border: none;
  }
  .multipleInput {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    height: 44px;
    border-radius: 10px;
    font-size: 13px;
    outline: none;
    border: none;
  }
  .multipleBody {
    padding-top: 10px;
    padding-right: 16px;
    padding-left: 16px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    column-gap: 20px;
  }
  .options {
    width: 100%;
    padding: 20px;
    margin-top: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  @media screen and (max-width: 1024px) {
    .oxInput {
      width: 68%;
    }
  }
`;

function EachNormalQuiz({ type, problem, answer, index, options }) {
  const quizState = useSelector((state) => state.quizState);
  const dispatch = useDispatch();
  const deleteOne = (index) => {
    const modifiedQuiz = quizState.quiz;
    modifiedQuiz.splice(index, 1);
    return modifiedQuiz;
  };
  return (
    <>
      <EachContainer>
        <div className="Eachtop">
          <span>
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
            <h3>{index < 9 ? "0" + (index + 1) : index + 1}</h3>
            {type === "ox"
              ? "OX 퀴즈"
              : type === "multiple"
              ? "객관식 퀴즈"
              : type === "simple"
              ? "단답형 퀴즈"
              : "서술형 퀴즈"}
          </span>
        </div>
        {type === "ox" ? (
          <div className="body">
            <input
              type="text"
              placeholder="문제를 입력해주세요."
              className="oxInput"
              value={problem}
              onChange={(event) =>
                dispatch({
                  type: MODIFY_QUIZ,
                  payload: {
                    ...quizState,
                    quiz: quizState.quiz.map((item, i) =>
                      i === index
                        ? { ...item, problem: event.target.value }
                        : item
                    ),
                  },
                })
              }
            />
            <span
              style={{
                display: "flex",
                columnGap: "20px",
                width: "15%",
                justifyContent: "flex-end",
              }}
            >
              <OButton
                selected={answer === "O" ? true : false}
                onClick={() =>
                  dispatch({
                    type: MODIFY_QUIZ,
                    payload: {
                      ...quizState,
                      quiz: quizState.quiz.map((item, i) =>
                        i === index ? { ...item, answer: "O" } : item
                      ),
                    },
                  })
                }
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C18.9956 15.8642 15.8642 18.9956 12 19ZM12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z"
                    fill="#ffffff"
                  />
                </svg>
              </OButton>
              <XButton
                selected={answer === "X" ? true : false}
                onClick={() =>
                  dispatch({
                    type: MODIFY_QUIZ,
                    payload: {
                      ...quizState,
                      quiz: quizState.quiz.map((item, i) =>
                        i === index ? { ...item, answer: "X" } : item
                      ),
                    },
                  })
                }
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
                    fill="#ffffff"
                  />
                </svg>
              </XButton>
            </span>
          </div>
        ) : type === "simple" ? (
          <div className="body">
            <input
              type="text"
              placeholder="문제를 입력해주세요."
              className="simpleInput"
              value={problem}
              onChange={(event) =>
                dispatch({
                  type: MODIFY_QUIZ,
                  payload: {
                    ...quizState,
                    quiz: quizState.quiz.map((item, i) =>
                      i === index
                        ? { ...item, problem: event.target.value }
                        : item
                    ),
                  },
                })
              }
            />
            <input
              type="text"
              placeholder="정답을 입력해주세요."
              className="simpleInput"
              value={answer}
              onChange={(event) =>
                dispatch({
                  type: MODIFY_QUIZ,
                  payload: {
                    ...quizState,
                    quiz: quizState.quiz.map((item, i) =>
                      i === index
                        ? { ...item, answer: event.target.value }
                        : item
                    ),
                  },
                })
              }
            />
          </div>
        ) : type === "writting" ? (
          <div className="body">
            <TextArea
              placeholder="문제를 입력해주세요."
              onChange={(event) =>
                dispatch({
                  type: MODIFY_QUIZ,
                  payload: {
                    ...quizState,
                    quiz: quizState.quiz.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            problem: event.target.value,
                            answer: "writing",
                          }
                        : item
                    ),
                  },
                })
              }
            />
          </div>
        ) : (
          <div className="multipleBody">
            <input
              type="text"
              placeholder="문제를 입력해주세요."
              className="multipleInput"
              value={problem}
              onChange={(event) =>
                dispatch({
                  type: MODIFY_QUIZ,
                  payload: {
                    ...quizState,
                    quiz: quizState.quiz.map((item, i) =>
                      i === index
                        ? { ...item, problem: event.target.value }
                        : item
                    ),
                  },
                })
              }
            />
            <div className="options">
              {options.map((item, i) => (
                <EachMultipleOptions
                  key={i}
                  index={i}
                  problemIndex={index}
                  statement={item}
                />
              ))}
            </div>
          </div>
        )}
      </EachContainer>
    </>
  );
}

export default EachNormalQuiz;
