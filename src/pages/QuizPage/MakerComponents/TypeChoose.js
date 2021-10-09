import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MODIFY_QUIZ } from "../../../reducers/quiz";

const TypeContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .typeItem {
    position: relative;
    width: 45%;
    background-color: #ecf0f1;
    display: flex;
    flex-direction: column;
    height: 400px;
    border-radius: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    transition: 350ms;
  }

  .typeItem:hover {
    transform: scale(1.07);
    cursor: pointer;
  }

  .typeContext {
    padding: 16px;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }

  .typeBottom {
    position: absolute;
    bottom: 16px;
    display: flex;
    column-gap: 10px;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }
`;

function TypeChoose() {
  const quizState = useSelector((state) => state.quizState);

  const dispatch = useDispatch();

  return (
    <TypeContainer>
      <div
        className="typeItem"
        onClick={() =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: { ...quizState, quizType: "NormalQuiz" },
          })
        }
      >
        <ItemBanner url="/img/quiz1.jpg" />
        <span className="typeContext">
          <h2>일반 퀴즈</h2>
          <p>혜윰을 통해 퀴즈를 만들어보세요!</p>
          <p>
            OX 퀴즈, 객관식, 서술형 등 여러 유형으로 퀴즈를 만들 수 있습니다!
          </p>
        </span>
        <span className="typeBottom">
          <h4 style={{ width: "fit-content" }}>만들러가기</h4>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
      <div
        className="typeItem"
        onClick={() =>
          dispatch({
            type: MODIFY_QUIZ,
            payload: { ...quizState, quizType: "EnglishWords" },
          })
        }
      >
        <ItemBanner url="/img/quiz2.jpg" />
        <span className="typeContext">
          <h2>영어 단어 퀴즈</h2>
          <p>혜윰을 통해 영어 단어 퀴즈를 만들어보세요!</p>
          <p>
            영어 단어 퀴즈에 적합한 템플릿을 제공합니다. 보다 쉽게 영어 단어
            퀴즈를 만들어 보세요!
          </p>
        </span>
        <span className="typeBottom">
          <h4 style={{ width: "fit-content" }}>만들러가기</h4>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </TypeContainer>
  );
}

const ItemBanner = styled.div`
  background: url(${(props) => props.url}) center center;
  background-size: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 100%;
  height: 60%;
`;

export default TypeChoose;
