import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import EnglishWordsQuiz from "./MakerComponents/EnglishWordsQuiz";
import NormalQuiz from "./MakerComponents/NormalQuiz";
import TypeChoose from "./MakerComponents/TypeChoose";
import { useDispatch, useSelector } from "react-redux";
import { INIT_QUIZ, MODIFY_QUIZ } from "../../reducers/quiz";

const Container = styled.div`
  width: 100%;
  min-height: 75vh;
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

function QuizMaker() {
  const userInfo = useSelector((state) => state.user);
  const quizState = useSelector((state) => state.quizState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: MODIFY_QUIZ,
      payload: {
        ...quizState,
        creatorId: userInfo._id,
        addedTo: [userInfo._id],
      },
    });
    return () => {
      dispatch({ type: INIT_QUIZ });
      console.log("cleanup");
    };
  }, [userInfo]);

  useState(() => {
    console.log(quizState);
  }, [quizState]);

  return (
    <Container>
      {quizState.quizType === "" ? (
        <TypeChoose />
      ) : quizState.quizType === "NormalQuiz" ? (
        <NormalQuiz />
      ) : (
        <EnglishWordsQuiz />
      )}
    </Container>
  );
}

export default QuizMaker;
