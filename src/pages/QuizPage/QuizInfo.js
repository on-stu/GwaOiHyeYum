import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getColor, getQuiz } from "../../lib/CustomFunctions";
import styled from "styled-components";
import BlankButton from "../../components/BlankButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCheck,
  faComment,
  faHeart,
  faPencilAlt,
  faPlusCircle,
  faShare,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API, Domain } from "../../api/consts";
import SpecificTypes from "./InfoComponents/SpecificTypes";
import MaterialButton from "../../components/MaterialButton";
import ProfileCard from "../../components/ProfileCard";
import TextArea from "../../components/TextArea";
import {
  DISLIKE_QUIZ,
  GET_QUIZ,
  INIT_QUIZ,
  LIKE_QUIZ,
} from "../../reducers/quiz";
import { dislikeQuiz, likeQuiz } from "../../actions/quizActions";
import { ADD_ANSWER } from "../../reducers/solveQuiz";

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

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .body {
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 12px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    row-gap: 20px;
    align-items: center;
    width: 100%;
  }

  .commentsIcons {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: gray;
    column-gap: 10px;
    justify-content: flex-end;
  }

  .myComments {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .submitButton {
    display: flex;
    margin-top: 10px;
    justify-content: flex-end;
  }

  @media screen and (max-width: 1024px) {
    .top {
      flex-direction: column;
      align-items: flex-start;
    }
    .container {
      width: 90%;
    }
    .buttons {
      flex-direction: column;
    }
    .xButton {
      display: flex;
      width: 100%;
      margin-top: 10px;
      justify-content: flex-end;
    }
  }
`;

function QuizInfo({ match }) {
  const {
    params: { quizId },
  } = match;

  const [isMyQuiz, setIsMyQuiz] = useState(false);

  const history = useHistory();
  const userInfo = useSelector((state) => state.user);
  const quiz = useSelector((state) => state.quizState);
  const solveQuizState = useSelector((state) => state.solveQuizState);
  const dispatch = useDispatch();

  const shareURL = `${Domain}/quizInfo/${quizId}`;

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `혜윰에서 ${quiz.title} 퀴즈를 공유했습니다.`,
        description: "퀴즈를 풀어보세요!",
        imageUrl: "",
        link: {
          webUrl: shareURL,
          mobileWebUrl: shareURL,
        },
      },
      buttons: [
        {
          title: "혜윰으로 이동",
          link: {
            webUrl: shareURL,
            mobileWebUrl: shareURL,
          },
        },
      ],
    });
  };

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
    return () => {
      dispatch({ type: INIT_QUIZ });
      console.log("cleanup");
    };
  }, []);

  useEffect(() => {
    if (quiz && quiz.creatorId === userInfo._id) {
      setIsMyQuiz(true);
    }
    console.log(quiz, solveQuizState);
  }, [userInfo, quiz]);

  const removeQuiz = async () => {
    if (window.confirm(`정말로 ${quiz.title} 퀴즈를 삭제하시겠습니까?`)) {
      const response = await axios.post(`${API}/quiz/removeQuiz`, {
        quiz: quiz,
      });
      if (response.data.status === "success") {
        alert("성공적으로 삭제되었습니다.");
        history.go(-1);
      } else {
        alert("예상치 못한 에러가 발생했습니다.");
        history.go(0);
      }
    }
  };

  const typeCheck = (array, query) => {
    return array.filter((el) => el.type === query).length;
  };

  return (
    <Container>
      <div className="container">
        <span className="top">
          <h3>
            <FontAwesomeIcon
              icon={faBrain}
              style={{ color: getColor("skyblue"), marginRight: "6px" }}
            />
            {quiz && quiz.title}
            <span style={{ fontSize: "12px", color: "gray" }}>
              {quiz && quiz.quizType === "NormalQuiz"
                ? "일반 퀴즈"
                : "영어 단어 퀴즈"}
            </span>
          </h3>
          <h3 className="xButton">
            {isMyQuiz ? (
              <BlankButton width="fit-content" onClick={removeQuiz}>
                <span
                  style={{
                    display: "flex",
                    columnGap: "4px",
                    color: "whitesmoke",
                    alignItems: "center",
                    backgroundColor: getColor("red"),
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <span>퀴즈 삭제</span>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </span>
              </BlankButton>
            ) : (
              ""
            )}
          </h3>
        </span>
        <div className="body">
          {quiz && (
            <p style={{ whiteSpace: "pre-line" }}>{quiz.quizIntroduction}</p>
          )}
          {quiz && quiz.quizType === "NormalQuiz" && (
            <SpecificTypes
              ox={quiz && typeCheck(quiz.quiz, "ox")}
              multiple={quiz && typeCheck(quiz.quiz, "multiple")}
              simple={quiz && typeCheck(quiz.quiz, "simple")}
              writting={quiz && typeCheck(quiz.quiz, "writting")}
            />
          )}
          <span className="buttons">
            {quiz && quiz.addedTo.includes(userInfo._id) ? (
              <MaterialButton color="green" text="추가됨" icon={faCheck} />
            ) : (
              <MaterialButton
                color="blue"
                text="내 퀴즈에 추가"
                icon={faPlusCircle}
              />
            )}
            <MaterialButton
              color="blue"
              text="문제 풀어보기"
              icon={faPencilAlt}
              onClick={() => history.push(`/quizSolve/${quizId}`)}
            />
            <MaterialButton
              color="blue"
              text="퀴즈 공유하기"
              icon={faShare}
              onClick={shareKakao}
            />
          </span>
          <span className="commentsIcons">
            {quiz && quiz.likes.includes(userInfo._id) ? (
              <>
                <BlankButton
                  width="fit-content"
                  onClick={() => {
                    dislikeQuiz(quizId, userInfo._id);
                    dispatch({ type: DISLIKE_QUIZ, payload: userInfo._id });
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ cursor: "pointer", color: getColor("red") }}
                  />
                </BlankButton>
                {quiz && quiz.likes.length}
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => {
                    likeQuiz(quizId, userInfo._id);
                    dispatch({ type: LIKE_QUIZ, payload: userInfo._id });
                  }}
                  style={{ cursor: "pointer" }}
                />
                {quiz && quiz.likes.length}
              </>
            )}
            <FontAwesomeIcon icon={faComment} />
            {quiz && quiz.comments.length}
          </span>
        </div>
      </div>
      <div className="container">
        <span className="myComments">
          <h3>댓글</h3>
          <div>
            <ProfileCard
              userId={userInfo._id}
              userNickname={userInfo.nickname}
              userPhotoURL={userInfo.photoURL}
              userType={userInfo.usertype}
              nofollowBtn={true}
            />
            <TextArea height="100px" placeholder="댓글을 달아주세요." />
            <div className="submitButton">
              <MaterialButton color="skyblue" text="쓰기" />
            </div>
          </div>
        </span>
      </div>
    </Container>
  );
}

export default QuizInfo;
