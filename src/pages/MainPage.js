import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Modal from "../components/Modal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Auth } from "../api/consts";
import CardContainer from "../components/CardContainer";
import Calendar from "../components/Calendar";

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  outline: none;
  border: none;

  select {
    width: 100%;
    padding: 20px;
    border: 1px solid gray;
    outline: none;
    background-color: #ffffff;
    font-family: inherit;
    border-radius: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .dropDown {
    position: absolute;
    right: 10px;
    top: 20px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  .buttonSpan {
    display: flex;
    justify-content: flex-end;
  }
`;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  .container {
    margin-top: 20px;
    width: 60%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 20px;
  }

  @media screen and (max-width: 1024px) {
    display: flex;
    width: 100%;
    justify-content: center;
    .container {
      width: 90%;
      display: flex;
      row-gap: 20px;
      flex-direction: column;
    }
  }
`;

function MainPage() {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user);

  const [modalVisible, setModalVisible] = useState(false);
  const [usertype, setUsertype] = useState("student");

  useEffect(() => {
    if (userInfo.usertype === "notyet") {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [userInfo]);

  const chooseUserType = async () => {
    const updatedUser = { ...userInfo, usertype: usertype };
    const response = await axios.post(`${Auth}/updateUser`, { updatedUser });
    if (response.data.status === "success") {
      history.go(0);
    }
  };

  return (
    <>
      <Modal visible={modalVisible}>
        <Container>
          <h2>추가 정보 확인</h2>
          <span>본인의 유형을 선택해주세요.</span>
          <SelectContainer>
            <select
              value={usertype}
              onChange={(event) => setUsertype(event.target.value)}
            >
              <option value="student">학생</option>
              <option value="teacher">선생님</option>
            </select>
            <FontAwesomeIcon className="dropDown" icon={faAngleDown} />
          </SelectContainer>
          <span className="buttonSpan">
            <Button onClick={chooseUserType}>확인</Button>
          </span>
        </Container>
      </Modal>
      <MainContainer>
        <div className="container">
          <CardContainer title="내 일정">
            <Calendar />
          </CardContainer>
          <CardContainer title="내 수업" />
          <CardContainer title="내 과제" />
          <CardContainer title="내 퀴즈" />
          <CardContainer title="자유 게시판" />
          <CardContainer title="중고 교재 거래" />
        </div>
      </MainContainer>
    </>
  );
}

export default MainPage;
