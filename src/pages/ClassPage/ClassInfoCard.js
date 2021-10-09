import { faCheck, faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BlankButton from "../../components/BlankButton";
import { getColor, getDisplayIcon } from "../../lib/CustomFunctions";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    column-gap: 10px;
    .iconTitle {
      display: flex;
      column-gap: 10px;
      align-items: center;
    }
    span {
      font-size: 13px;
      color: gray;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .classButton {
      display: flex;
      column-gap: 5px;
      border-radius: 5px;
      padding: 12px;
      color: white;
      background-color: ${getColor("blue")};
    }
  }
  @media screen and (max-width: 1024px) {
    .left {
      flex-direction: column;
    }
  }
`;

function ClassInfoCard({
  classId,
  classTitle,
  students,
  iconColor,
  displayIcon,
  teacherNickname,
}) {
  const userInfo = useSelector((state) => state.user);

  return (
    <Container>
      <div className="left">
        <div className="iconTitle">
          <FontAwesomeIcon
            icon={getDisplayIcon(displayIcon)}
            size="2x"
            style={{ color: iconColor }}
          />
          <h2>{classTitle}</h2>
        </div>
        <span>{teacherNickname}&nbsp;선생님</span>
      </div>
      <div className="right">
        {userInfo &&
        userInfo.usertype === "student" &&
        userInfo.classes.includes(classId) ? (
          <BlankButton width="fit-content">
            <span className="classButton">
              수강중
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </BlankButton>
        ) : userInfo && userInfo.usertype === "student" ? (
          <BlankButton width="fit-content">
            <span className="classButton">
              수강신청
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </BlankButton>
        ) : userInfo &&
          userInfo.usertype === "teacher" &&
          userInfo.classes.includes(classId) ? (
          <BlankButton width="fit-content">
            <span className="classButton">
              설정
              <FontAwesomeIcon icon={faCog} />
            </span>
          </BlankButton>
        ) : (
          <h4>hi</h4>
        )}
      </div>
    </Container>
  );
}

export default ClassInfoCard;
