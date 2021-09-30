import React, { useEffect, useState } from "react";
import { getUserProfile, updateUser } from "../lib/CustomFunctions";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ProfileImage } from "../components/ProfileImage";
import { getMyClasses } from "../actions/classesActions";
import { useDispatch, useSelector } from "react-redux";
import BlankButton from "../components/BlankButton";
import Card from "../components/Card";
import TextArea from "../components/TextArea";
import { Button } from "@material-ui/core";
import NotYet from "../components/NotYet";

const ProfileContainer = styled.div`
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
  .profileItem {
    display: flex;

    width: 100%;
    flex-direction: column;
  }
  .itemBody {
    padding: 20px;
  }
  .itemFooter {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }
  .preview {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  img {
    width: 50px;
  }

  .previewContext {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }
  .uploadContainer {
    position: relative;
    width: fit-content;
    height: fit-content;
  }
  .uploadButton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  @media screen and (max-width: 1024px) {
    display: flex;
    width: 100%;
    justify-content: center;
    .container {
      width: 90%;
      display: flex;
    }
  }
`;

function ProfilePage({ match }) {
  const [profile, setProfile] = useState();
  const [photoURL, setPhotoURL] = useState("");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [myIntroduction, setMyIntroduction] = useState("");

  const userInfo = useSelector((state) => state.user);
  const classes = useSelector((state) => state.classes);
  const dispatch = useDispatch();

  const history = useHistory();
  const {
    params: { id },
  } = match;

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPhotoURL(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const updatePhotoURL = async (photoURL) => {
    const updatedUser = { ...userInfo, photoURL: photoURL };
    const response = await updateUser(updatedUser);
    if (response.data.status === "success") {
      history.go(0);
    }
  };

  const updateIntroduction = async () => {
    if (window.confirm("자기소개글을 수정하시겠습니까?")) {
      if (!myIntroduction) {
        alert("내용을 입력해주세요");
      } else {
        const updatedUser = { ...userInfo, selfIntroduction: myIntroduction };
        const response = await updateUser(updatedUser);
        if (response.data.status === "success") {
          history.go(0);
        }
      }
    } else {
      console.log("no");
    }
  };

  useEffect(() => {
    if (photoURL) {
      updatePhotoURL(photoURL);
    }
  }, [photoURL]);

  useEffect(() => {
    getUserProfile(id).then((res) => {
      if (res.data.profile) {
        setProfile(res.data.profile[0]);
        if (userInfo) {
          if (id === userInfo._id) {
            setIsMyProfile(true);
          }
        }
      } else {
        alert("사용자를 찾을 수 없습니다.");
        history.go(-1);
      }
    });
  }, [id]);

  useEffect(() => {
    dispatch(getMyClasses(profile));
    if (profile) {
      setMyIntroduction(profile.selfIntroduction);
    }
  }, [profile]);

  useEffect(() => {
    if (id === userInfo._id) {
      setIsMyProfile(true);
    }
  }, [userInfo]);

  return (
    <ProfileContainer>
      <div className="container preview">
        {isMyProfile ? (
          <label htmlFor="profileImage">
            <div className="uploadContainer">
              <ProfileImage photoURL={profile && profile.photoURL} />
              <div className="uploadButton">
                {profile && profile.photoURL ? (
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      paddingTop: "10px",
                      color: "white",
                    }}
                  >
                    <h4 style={{ marginBottom: "10px" }}>사진 변경</h4>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      paddingTop: "10px",
                      color: "white",
                    }}
                  >
                    <h4 style={{ marginBottom: "10px" }}>업로드</h4>
                  </div>
                )}
              </div>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => getBase64(event.target.files[0])}
            />
          </label>
        ) : (
          <ProfileImage photoURL={profile && profile.photoURL} />
        )}
        <div className="previewContext">
          <h2>{profile && profile.nickname}</h2>
          <h4 style={{ color: "gray" }}>
            {profile && profile.usertype === "teacher" ? "선생님 " : "학생 "}
          </h4>
        </div>
      </div>
      <div className="container">
        <div className="profileItem">
          <h4>자기소개글</h4>
          <div className="itemBody">
            {isMyProfile ? (
              <TextArea
                value={myIntroduction}
                onChange={(event) => setMyIntroduction(event.target.value)}
              />
            ) : (
              profile && (
                <p style={{ whiteSpace: "pre-line" }}>
                  {profile.selfIntroduction}
                </p>
              )
            )}
          </div>
          <span className="itemFooter">
            {isMyProfile && (
              <Button color="default" onClick={updateIntroduction}>
                수정
              </Button>
            )}
          </span>
        </div>
        <div className="profileItem">
          <h4>개설 수업</h4>
          <div className="itemBody">
            {classes &&
              classes.map((eachClass) => (
                <BlankButton
                  key={eachClass._id}
                  onClick={() => history.push(`/class/${eachClass._id}`)}
                >
                  <Card
                    title={eachClass.classTitle}
                    iconcolor={eachClass.iconColor}
                    displayIcon={eachClass.displayIcon}
                    studentName={
                      eachClass.students.length > 0
                        ? eachClass.students[0] + " 학생"
                        : "등록된 학생이 없습니다."
                    }
                  />
                </BlankButton>
              ))}
          </div>
          <span className="itemFooter"></span>
        </div>
        <div className="profileItem">
          <h4>퀴즈</h4>
          <div className="itemBody">
            <NotYet />
          </div>
          <span className="itemFooter"></span>
        </div>
      </div>
      {isMyProfile && (
        <div className="container">
          <div className="profileItem">
            <h4>비밀번호 변경</h4>
            <div className="itemBody"></div>
            <span className="itemFooter"></span>
          </div>
          <div className="profileItem">
            <h4>회원 유형 변경</h4>
            <div className="itemBody"></div>
            <span className="itemFooter"></span>
          </div>
          <div className="profileItem">
            <h4>멤버쉽 상태 변경</h4>
            <div className="itemBody">
              <NotYet />
            </div>
            <span className="itemFooter"></span>
          </div>
          <div className="profileItem">
            <h4>회원 탈퇴</h4>
            <div className="itemBody"></div>
            <span className="itemFooter"></span>
          </div>
        </div>
      )}
    </ProfileContainer>
  );
}

export default ProfilePage;
