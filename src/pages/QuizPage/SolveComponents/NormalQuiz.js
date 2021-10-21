import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import EachNormalQuiz from "./EachNormalQuiz";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .container {
    margin-top: 20px;
    width: 60%;
    background-color: #f5f5f5;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
`;

function NormalQuiz() {
  const quiz = useSelector((state) => state.quizState);
  const [quizIndex, setQuizIndex] = useState(0);

  return (
    <Container>
      <div className="container">
        <h3>{quiz.title}</h3>
      </div>
      <div className="container">
        {quiz && quiz.quizSolve.length > 0 && (
          <EachNormalQuiz
            problem={quiz.quiz[quizIndex].problem}
            answer={quiz.quizSolve[quizIndex].myAnswer}
            type={quiz.quiz[quizIndex].type}
            index={quizIndex}
            options={quiz.quiz[quizIndex].options}
          />
        )}
        <span>
          <Button
            onClick={() => {
              if (quizIndex === 0) {
                alert("1번 문제입니다.");
              } else {
                setQuizIndex(quizIndex - 1);
              }
            }}
          >
            previous
          </Button>
          <Button
            onClick={() => {
              if (quiz && quizIndex === quiz.quiz.length - 1) {
                alert("마지막 문제입니다");
              } else {
                setQuizIndex(quizIndex + 1);
              }
            }}
          >
            next
          </Button>
        </span>
      </div>
    </Container>
  );
}

export default NormalQuiz;
