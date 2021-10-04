import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
  .userInfo {
    font-size: 13px;
  }
  .followInfo {
    position: absolute;
    display: flex;
    align-items: center;
    right: 5px;
    height: 100%;
  }
`;

const ProfileContainer = styled.div`
  width: 30px;
  height: 30px;
  ${(props) =>
    props.photoURL
      ? "background-image: url(" + props.photoURL + ");"
      : "background-color: #bdc3c7;"}
  background-position: center center;
  background-size: cover;
  border-radius: 10%;
`;

function ProfileCard({ userId, userNickname, userType, userPhotoURL }) {
  const userInfo = useSelector((state) => state.user);

  return (
    <Container>
      <div className="userPhoto">
        {userPhotoURL ? (
          <ProfileContainer photoURL={userPhotoURL} />
        ) : (
          <FontAwesomeIcon
            className="icon"
            style={{ width: "30px", height: "30px", color: "gray" }}
            icon={faUserAlt}
          />
        )}
      </div>
      <div className="userInfo">
        {userNickname}&nbsp;
        {userType === "teacher" ? "선생님" : "학생"}
      </div>
      <div className="followInfo">
        {userInfo.following && userInfo.following.includes(userId)
          ? "팔로잉"
          : userInfo && userInfo._id === userId
          ? "나"
          : "팔로우"}
      </div>
    </Container>
  );
}

export default ProfileCard;
