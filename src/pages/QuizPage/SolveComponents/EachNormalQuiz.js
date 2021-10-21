import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OButton, XButton } from "../../../components/OXButtons";
import TextArea from "../../../components/TextArea";
import { MODIFY_QUIZ, SOLVE_QUIZ } from "../../../reducers/quiz";
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
    width: 100%;
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

  useEffect(() => {
    console.log("thisQUiz", quizState);
  }, [quizState]);

  return (
    <>
      <EachContainer>
        <div className="Eachtop">
          <span>
            <h3>{index < 9 ? "0" + (index + 1) : index + 1}</h3>
            <span className="problemTitle">{problem}</span>
          </span>
        </div>
        {type === "ox" ? (
          <div className="body">
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
                    type: SOLVE_QUIZ,
                    index,
                    payload: "O",
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
                    type: SOLVE_QUIZ,
                    index,
                    payload: "X",
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
              placeholder="정답을 입력해주세요."
              className="simpleInput"
              value={answer}
              onChange={(event) =>
                dispatch({
                  type: SOLVE_QUIZ,
                  index,
                  payload: event.target.value,
                })
              }
            />
          </div>
        ) : type === "writting" ? (
          <div className="body">
            <TextArea
              placeholder="정답을 입력해주세요."
              value={quizState.quizSolve[index].myAnswer}
              onChange={(event) =>
                dispatch({
                  type: SOLVE_QUIZ,
                  index,
                  payload: event.target.value,
                })
              }
            />
          </div>
        ) : (
          <div className="multipleBody">
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
