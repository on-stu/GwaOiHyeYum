import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getQuiz } from "../../lib/CustomFunctions";
import { GET_QUIZ, INIT_QUIZ, INIT_SOLVE_QUIZ } from "../../reducers/quiz";
import { ADD_ANSWER, MODIFY_ANSWER } from "../../reducers/solveQuiz";
import EnglishWordsQuiz from "./SolveComponents/EnglishWordsQuiz";
import NormalQuiz from "./SolveComponents/NormalQuiz";

function QuizSolve({ match }) {
  const {
    params: { quizId },
  } = match;

  const quiz = useSelector((state) => state.quizState);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    getQuiz(quizId).then((res) => {
      console.log(res.data.quiz);
      if (res.data.status === "success") {
        if (res.data.quiz.length !== 0) {
          dispatch({ type: GET_QUIZ, payload: res.data.quiz[0] });
        }
      } else {
        alert("퀴즈 정보를 찾을 수 없습니다.");
        history.go(-1);
      }
    });

    return () => dispatch({ type: INIT_QUIZ });
  }, []);

  useEffect(() => {
    if (quiz.quizSolve.length === 0) {
      dispatch({ type: INIT_SOLVE_QUIZ });
    }
    console.log("changedQuiz", quiz);
  }, [quiz]);

  return (
    <>
      {quiz && quiz.quizType === "NormalQuiz" ? (
        <NormalQuiz />
      ) : (
        <EnglishWordsQuiz />
      )}
    </>
  );
}

export default QuizSolve;
