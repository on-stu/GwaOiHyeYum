import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/Modal";
import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useState } from "react";
import BlankButton from "./BlankButton";
import { getColor, getDisplayIcon } from "../lib/CustomFunctions";
import { useDispatch, useSelector } from "react-redux";
import { createClass } from "../actions/classesActions";
import { useHistory } from "react-router";

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 12px;

  .radioTitle {
    display: flex;
    width: 100%;
  }

  .options {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

function Card({ title, studentName, add, iconcolor, displayIcon }) {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [modalVisible, setModalVisible] = useState(false);
  const [addClassTitle, setAddClasstitle] = useState("");
  const [addClassSubject, setAddClassSubject] = useState("");
  const [addIconSelect, setAddIconSelect] = useState("book");
  const [addColorSelect, setAddColorSelect] = useState("black");

  const onSubmit = (event) => {
    event.preventDefault();
    if (userInfo.usertype === "teacher") {
      const request = {
        teacherId: userInfo._id,
        teacherNickname: userInfo.nickname,
        classTitle: addClassTitle,
        subjectName: addClassSubject,
        displayIcon: addIconSelect,
        iconColor: addColorSelect,
      };
      dispatch(createClass(request)).then(() => history.go(0));
    } else {
      alert("선생님만 수업을 개설할 수 있습니다.");
    }
  };

  return (
    <>
      {add && (
        <Modal visible={modalVisible}>
          <ModalContainer>
            <h2>수업 추가</h2>
            <div className="form">
              <input
                type="text"
                value={addClassTitle}
                onChange={(event) => setAddClasstitle(event.target.value)}
                required
                maxLength={10}
                placeholder="수업 이름"
              />
              <input
                type="text"
                value={addClassSubject}
                maxLength={10}
                required
                onChange={(event) => setAddClassSubject(event.target.value)}
                placeholder="과목"
              />
              <RadioContainer>
                <div className="radioTitle">
                  <h4 style={{ color: "gray" }}>아이콘 선택</h4>
                </div>
                <div className="options">
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddIconSelect("book")}
                  >
                    <FontAwesomeIcon icon={getDisplayIcon("book")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddIconSelect("check")}
                  >
                    <FontAwesomeIcon icon={getDisplayIcon("check")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddIconSelect("clipboard")}
                  >
                    <FontAwesomeIcon icon={getDisplayIcon("clipboard")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddIconSelect("clip")}
                  >
                    <FontAwesomeIcon icon={getDisplayIcon("clip")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddIconSelect("postit")}
                  >
                    <FontAwesomeIcon icon={getDisplayIcon("postit")} />
                  </BlankButton>
                </div>
              </RadioContainer>
              <RadioContainer>
                <div className="radioTitle">
                  <h4 style={{ color: "gray" }}>아이콘 색 선택</h4>
                </div>
                <div className="options">
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddColorSelect("black")}
                  >
                    <ColorDiv bgcolor={getColor("black")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddColorSelect("green")}
                  >
                    <ColorDiv bgcolor={getColor("green")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddColorSelect("blue")}
                  >
                    <ColorDiv bgcolor={getColor("blue")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddColorSelect("red")}
                  >
                    <ColorDiv bgcolor={getColor("red")} />
                  </BlankButton>
                  <BlankButton
                    width="fit-content"
                    onClick={() => setAddColorSelect("purple")}
                  >
                    <ColorDiv bgcolor={getColor("purple")} />
                  </BlankButton>
                </div>
              </RadioContainer>
              <div className="previewContainer">
                <h4 style={{ color: "gray" }}>미리 보기</h4>
                <Container iconcolor={getColor(addColorSelect)}>
                  <FontAwesomeIcon
                    className="addIcon"
                    iconcolor={getColor(addColorSelect)}
                    icon={getDisplayIcon(addIconSelect)}
                  />
                  <span>{addClassTitle}</span>
                  <span className="right">
                    {userInfo.nickname}
                    {userInfo.usertype === "teacher" && " 선생님"}
                  </span>
                </Container>
              </div>
              <div className="buttonContainer">
                <Button
                  onClick={() => {
                    setModalVisible(false);
                  }}
                >
                  취소
                </Button>
                <Button onClick={onSubmit}>추가</Button>
              </div>
            </div>
          </ModalContainer>
        </Modal>
      )}
      <BlankButton onClick={() => setModalVisible(true)}>
        <Container add={add} iconcolor={iconcolor}>
          {add ? (
            <>
              <FontAwesomeIcon className="icon" icon={faPlusCircle} />
              <span>수업을 추가해주세요.</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                className="icon"
                icon={getDisplayIcon(displayIcon)}
              />
              <span>{title}</span>
              <span className="right">{studentName}</span>
            </>
          )}
        </Container>
      </BlankButton>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 50px;

  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: center;
  column-gap: 10px;
  .icon {
    color: ${(props) => (props.add ? "gray" : props.iconcolor)};
  }
  .right {
    position: absolute;
    right: 10px;
    font-size: 13px;
    color: gray;
  }
  span {
    color: ${(props) => (props.add ? "gray" : "black")};
    font-size: 14px;
  }
  .addIcon {
    color: ${(props) => props.iconcolor};
  }
`;

const ModalContainer = styled.div`
  width: 100%;

  .form {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
  display: flex;
  flex-direction: column;

  .form input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 15px;
    outline: none;
    border: 1px solid gray;
  }
  .form .buttonContainer {
    display: flex;
    justify-content: space-between;
  }
  .previewContainer {
    display: flex;
    flex-direction: column;
  }
  .iconSelectContainer {
    padding-left: 20px;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, 1fr);
  }
  .addIcon {
    color: ${(props) => props.iconcolor};
  }
`;

const ColorDiv = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.bgcolor};
`;

export default Card;
