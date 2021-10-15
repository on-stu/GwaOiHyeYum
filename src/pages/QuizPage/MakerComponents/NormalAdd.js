import { faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor } from "../../../lib/CustomFunctions";
import { MODIFY_QUIZ } from "../../../reducers/quiz";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  margin-top: 10px;
  color: gray;
  cursor: pointer;
  :hover {
    color: black;
  }
`;

const QuizSelector = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  margin-top: 10px;

  span {
    color: gray;
    cursor: pointer;
  }
  span:hover {
    color: black;
  }
  .back {
    color: ${getColor("red")};
    cursor: pointer;
  }
`;

function NormalAdd() {
  const [add, setAdd] = useState(false);

  const quizState = useSelector((state) => state.quizState);
  const dispatch = useDispatch();

  const onClick = (event) => {
    console.log(event.target.id);
    const {
      target: { id },
    } = event;
    if (id !== "multiple") {
      dispatch({
        type: MODIFY_QUIZ,
        payload: {
          ...quizState,
          quiz: [
            ...quizState.quiz,
            { problem: "", answer: "", options: [], type: id },
          ],
        },
      });
      setAdd(!add);
    } else {
      dispatch({
        type: MODIFY_QUIZ,
        payload: {
          ...quizState,
          quiz: [
            ...quizState.quiz,
            {
              problem: "",
              answer: "",
              options: ["", "", "", "", ""],
              type: id,
            },
          ],
        },
      });
      setAdd(!add);
    }
  };

  return (
    <>
      {add ? (
        <QuizSelector>
          추가 :
          <span id="ox" onClick={onClick}>
            OX 퀴즈
          </span>
          <span id="multiple" onClick={onClick}>
            객관식 퀴즈
          </span>
          <span id="simple" onClick={onClick}>
            단답형 퀴즈
          </span>
          <span id="writting" onClick={onClick}>
            서술형 퀴즈
          </span>
          <div className="back" onClick={() => setAdd(!add)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </QuizSelector>
      ) : (
        <Container onClick={() => setAdd(!add)}>
          <span>새 문제 추가하기</span>
          <FontAwesomeIcon icon={faPlusCircle} />
        </Container>
      )}
    </>
  );
}

export default NormalAdd;
