import React, { useEffect, useState } from "react";
import {
  followCancel,
  followUser,
  getUserProfile,
  updateUser,
} from "../../lib/CustomFunctions";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { ProfileImage } from "../../components/ProfileImage";
import { getMyClasses } from "../../actions/classesActions";
import { useDispatch, useSelector } from "react-redux";
import BlankButton from "../../components/BlankButton";
import Card from "../../components/Card";
import TextArea from "../../components/TextArea";
import { Button } from "@material-ui/core";
import NotYet from "../../components/NotYet";
import { SelectContainer } from "../MainPage";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KaKaoLogin from "react-kakao-login";
import axios from "axios";
import { Auth, Domain } from "../../api/consts";
import { getMyFollowers, getMyFollowings } from "../../actions/followActions";
import UserListButton from "../../components/UserListButton";
import { getMyQuizes } from "../../actions/quizesActions";

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
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    input {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 15px;
      font-size: 13px;
      outline: none;
      border: none;
    }
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
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    row-gap: 5px;
  }

  .previewBody {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
  }

  .previewRight {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .previewRight > span {
    display: flex;
    align-items: center;
    column-gap: 8px;
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
    .itemBody {
      margin-top: 10px;
      padding: 5px;
    }
  }
`;

function ProfilePage({ match }) {
  const [profile, setProfile] = useState();
  const [photoURL, setPhotoURL] = useState("");
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [myIntroduction, setMyIntroduction] = useState("");
  const [usertype, setUsertype] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [quitPassword, setQuitPassword] = useState("");
  const [quitReason, setQuitReason] = useState("");

  const userInfo = useSelector((state) => state.user);
  const classes = useSelector((state) => state.classes);
  const userFollowers = useSelector((state) => state.followers);
  const userFollowings = useSelector((state) => state.followings);
  const quizes = useSelector((state) => state.quizesState);

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

  const updateUserType = async () => {
    if (userInfo.usertype === "teacher" && userInfo.usertype !== usertype) {
      if (
        window.confirm(
          "회원 유형을 변경하시겠습니까?\n교사에서 학생으로 변경 시 개설 강좌 정보가 사라집니다.\n(강좌는 남아있으나 앞으로 교사로서 강좌를 수정할 권한은 사라집니다.)"
        )
      ) {
        const updatedUser = { ...userInfo, usertype: usertype };
        const response = await updateUser(updatedUser);
        if (response.data.status === "success") {
          history.go(0);
        }
      }
    } else {
      if (
        window.confirm(
          "회원 유형을 변경하시겠습니까?\n학생에서 교사로 변경 시 현재 수강중인 수업에서 자동으로 탈퇴됩니다."
        )
      ) {
        const updatedUser = { ...userInfo, usertype: usertype };
        const response = await updateUser(updatedUser);
        if (response.data.status === "success") {
          history.go(0);
        }
      }
    }
  };

  const changePassword = async () => {
    const token = localStorage.getItem("token");
    if (newPassword === confirmNewPassword) {
      const response = await axios.post(`${Auth}/changePassword`, {
        token,
        password,
        newpassword: newPassword,
      });
      console.log(response);
      if (response.data.status === "success") {
        alert("비밀번호 변경에 성공했습니다");
        history.go(0);
      } else {
        alert(response.data.error);
      }
    } else {
      alert("새 비밀번호를 확인해주세요");
    }
  };

  const deleteUser = async (id, password, reason) => {
    if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
      const quitAt = Date.now();
      const response = await axios.post(`${Auth}/deleteUser`, {
        id,
        password,
        reason,
        quitAt,
      });
      if (response.data.status === "success") {
        localStorage.removeItem("token");
        history.go(0);
      }
    }
  };

  const responseKaKao = async (res) => {
    const {
      profile: { id },
    } = res;
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      if (id) {
        const quitAt = Date.now();
        const response = await axios.post(`${Auth}/deleteUser`, {
          id: userInfo._id,
          reason: quitReason,
          password: "kakao",
          quitAt,
        });

        const {
          data: { status },
        } = response;
        if (status === "success") {
          localStorage.removeItem("token");
          history.go(0);
        }
      }
    }
  };

  const ProfileURL = `${Domain}/profile/${userInfo._id}`;

  const shareProfileKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${userInfo.nickname}의 혜윰 프로필입니다.`,
        description: "프로필을 확인하고 팔로우해주세요!",
        imageUrl: "",
        link: {
          webUrl: ProfileURL,
          mobileWebUrl: ProfileURL,
        },
      },
      buttons: [
        {
          title: "혜윰으로 이동",
          link: {
            webUrl: ProfileURL,
            mobileWebUrl: ProfileURL,
          },
        },
      ],
    });
  };

  const FollowButton = () => {
    followUser(userInfo._id, id).then((res) => {
      if (res.data.status === "success") {
        history.go(0);
      }
    });
  };

  const FollowCancleButton = () => {
    if (
      window.confirm(
        `정말로 ${profile.nickname}님에 대한 팔로우를 취소하시겠습니까?`
      )
    ) {
      followCancel(userInfo._id, id).then((res) => {
        if (res.data.status === "success") {
          alert("취소되었습니다.");
          history.go(0);
        }
      });
    }
  };

  useEffect(() => {
    if (photoURL) {
      updatePhotoURL(photoURL);
    }
  }, [photoURL]);

  useEffect(() => {
    getUserProfile(id).then((res) => {
      if (res.data.status === "success") {
        if (res.data.profile.length !== 0) {
          setProfile(res.data.profile[0]);
          if (userInfo) {
            if (id === userInfo._id) {
              setIsMyProfile(true);
            }
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
    dispatch(getMyQuizes(profile));
    if (profile) {
      setMyIntroduction(profile.selfIntroduction);
      setUsertype(profile.usertype);
      dispatch(getMyFollowers(profile.follower));
      dispatch(getMyFollowings(profile.following));
    }
    if (id === userInfo._id) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }
  }, [profile]);

  useEffect(() => {
    if (id === userInfo._id) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
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
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
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
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
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
          <div className="previewBody">
            <h2>{profile && profile.nickname}</h2>
            <h4 style={{ color: "gray" }}>
              {profile && profile.usertype === "teacher" ? "선생님 " : "학생 "}
            </h4>
            {userInfo && userInfo._id === id ? (
              <BlankButton onClick={shareProfileKakao}>
                <h4>프로필 공유</h4>
              </BlankButton>
            ) : userInfo.following && userInfo.following.includes(id) ? (
              <BlankButton onClick={FollowCancleButton}>
                <h4>팔로잉</h4>
              </BlankButton>
            ) : (
              <BlankButton onClick={FollowButton}>
                <h4>팔로우</h4>
              </BlankButton>
            )}
          </div>
          <div className="previewRight">
            <UserListButton
              users={userFollowers && userFollowers}
              type="follower"
              title={`${profile && profile.nickname}님의 팔로워`}
            >
              <span>
                <h4>팔로워</h4>
                <h4>{profile && profile.follower.length}명</h4>
              </span>
            </UserListButton>
            <UserListButton
              users={userFollowings && userFollowings}
              type="following"
              title={`${profile && profile.nickname}님의 팔로잉`}
            >
              <span>
                <h4>팔로잉 </h4>
                <h4>{profile && profile.following.length}명</h4>
              </span>
            </UserListButton>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="profileItem">
          <h4>자기소개글</h4>
          <div className="itemBody">
            {isMyProfile ? (
              <TextArea
                value={myIntroduction}
                placeholder="자기소개글을 작성해주세요!"
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
          {profile && profile.usertype === "teacher" ? (
            <h4>개설 수업</h4>
          ) : (
            <h4>수강중인 수업</h4>
          )}
          <div className="itemBody">
            {classes && classes.length > 0 ? (
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
              ))
            ) : (
              <NotYet
                placeholder={
                  profile && profile.usertype === "teacher"
                    ? "개설된 수업이 없습니다."
                    : "수강중인 수업이 없습니다."
                }
              />
            )}
          </div>
          <span className="itemFooter"></span>
        </div>
        <div className="profileItem">
          <h4>퀴즈</h4>
          <div className="itemBody">
            {quizes && quizes.length > 0 ? (
              quizes.map((item) => (
                <BlankButton
                  key={item._id}
                  onClick={() => history.push(`/quizInfo/${item._id}`)}
                >
                  <Card
                    title={item.title}
                    displayIcon="brain"
                    iconcolor="skyblue"
                  />
                </BlankButton>
              ))
            ) : (
              <NotYet placeholder="추가된 퀴즈가 없습니다." />
            )}
          </div>
          <span className="itemFooter"></span>
        </div>
      </div>
      {isMyProfile && (
        <div className="container">
          {profile && profile.socialLogin !== "kakao" && (
            <div className="profileItem">
              <h4>비밀번호 변경</h4>
              <div className="itemBody">
                <input
                  placeholder="기존 비밀번호"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <input
                  placeholder="새 비밀번호"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <input
                  placeholder="새 비밀번호 확인"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                />
              </div>
              <span className="itemFooter">
                <Button onClick={changePassword}>확인</Button>
              </span>
            </div>
          )}
          <div className="profileItem">
            <h4>회원 유형 변경</h4>
            <div className="itemBody">
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
            </div>
            <span className="itemFooter">
              <Button onClick={updateUserType}>확인</Button>
            </span>
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
            {userInfo.socialLogin !== "kakao" ? (
              <>
                <div className="itemBody">
                  <input
                    placeholder="비밀번호"
                    type="password"
                    value={quitPassword}
                    onChange={(event) => setQuitPassword(event.target.value)}
                  />
                  <input
                    placeholder="탈퇴 이유를 적어주세요"
                    value={quitReason}
                    onChange={(event) => setQuitReason(event.target.value)}
                  />
                </div>
                <span className="itemFooter">
                  <Button
                    onClick={() =>
                      deleteUser(userInfo._id, quitPassword, quitReason)
                    }
                  >
                    회원 탈퇴
                  </Button>
                </span>
              </>
            ) : (
              <div className="itemBody">
                <input
                  placeholder="탈퇴 이유를 적어주세요"
                  value={quitReason}
                  onChange={(event) => setQuitReason(event.target.value)}
                />
                <KaKaoLogin
                  className="kakaoLogin"
                  jskey={"28725562855bb20f5d88ee3ce511eb3f"}
                  onSuccess={responseKaKao}
                  onFail={() => alert("실패했습니다")}
                  getProfile={true}
                  style={{
                    width: "100%",
                    height: "56px",
                    boxSizing: "border-box",
                    backgroundColor: "#FFEB00",
                    borderRadius: "10px",
                    fontSize: "14px",
                    outline: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  카카오로 인증 후 회원탈퇴하기
                </KaKaoLogin>
              </div>
            )}
          </div>
        </div>
      )}
    </ProfileContainer>
  );
}

export default ProfilePage;
