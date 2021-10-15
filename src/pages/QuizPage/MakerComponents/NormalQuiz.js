import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { API } from "../../../api/consts";
import TextArea from "../../../components/TextArea";
import { getColor } from "../../../lib/CustomFunctions";
import { MODIFY_QUIZ } from "../../../reducers/quiz";
import EachNormalQuiz from "./EachNormalQuiz";
import NormalAdd from "./NormalAdd";

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
  height: fit-content;

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
    flex-direction: column;
    row-gap: 20px;
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
  .bottom {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  @media screen and (max-width: 1024px) {
    width: 90%;
  }
`;

function NormalQuiz() {
  const quizState = useSelector((state) => state.quizState);
  const dispatch = useDispatch();

  const history = useHistory();

  const isBlank = (array) => {
    for (var i = 0; i < array.length; i++) {
      console.log(array[i]);
      if (array[i].problem === "" || array[i].answer === "") {
        return true;
      }
    }
    return false;
  };

  const onSubmit = async () => {
    const req = { ...quizState, createdAt: Date.now() };
    if (req.title === "") {
      alert("제목을 입력하세요.");
    } else if (isBlank(req.quiz)) {
      alert("모든 문제와 답은 기입되어야 합니다.");
    } else {
      const response = await axios.post(`${API}/quiz/makeQuiz`, req);

      if (response.data.status === "success") {
        history.push("/");
        history.go(0);
      }
    }
  };

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
        <span>일반 퀴즈 만들기</span>
      </div>
      <div className="body">
        <h3>퀴즈 정보</h3>
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
        <TextArea
          placeholder="퀴즈 소개를 적어주세요."
          onChange={(event) =>
            dispatch({
              type: MODIFY_QUIZ,
              payload: { ...quizState, quizIntroduction: event.target.value },
            })
          }
        />
        <h3>문제 추가</h3>
        {quizState.quiz.map((item, index) => (
          <EachNormalQuiz
            key={index}
            type={item.type}
            problem={item.problem}
            answer={item.answer}
            index={index}
            options={item.options}
          />
        ))}
        <NormalAdd />
      </div>
      <div className="bottom">
        <div
          style={{
            display: "flex",
            columnGap: "10px",
            backgroundColor: getColor("blue"),
            color: "#f5f5f5",
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onSubmit}
        >
          <span>만들기</span>
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    </Container>
  );
}

export default NormalQuiz;
