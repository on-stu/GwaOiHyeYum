import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import { Auth } from "../api/consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .loginContainer {
    width: 30%;
    min-width: 370px;
    height: 50%;
    min-height: 500px;
    background-color: #f5f5f5;
    border-radius: 20px;
    padding: 2%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
  }
  h1 {
    margin-bottom: 30px;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  form input {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 15px;
    outline: none;
    border: none;
  }
  .primaryColor {
    background-color: #2980b9;
    color: #f5f5f5;
  }
  .primaryColor:hover {
    background-color: #2980b9;
  }
  .buttonContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .buttonContainer Button {
    height: 70px;
    width: 49%;
  }
  .secondaryColor {
    background-color: #f1c40f;
  }
  .KakaoButton {
    background-image: url(../img/kakao_login.png);
    background-position: center;
    background-size: cover;
  }
  form select {
    width: 100%;
    padding: 20px;
    border: none;
    outline: none;
    background-color: #ffffff;
    font-family: inherit;
    border-radius: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .selectContainer {
    display: flex;
    width: 100%;
    position: relative;
  }
  .dropDown {
    position: absolute;
    right: 10px;
    top: 20px;
  }
`;

function AuthPage({ match }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [usertype, setUsertype] = useState("student");
  const history = useHistory();

  if (match.params.isRegister === "register") {
    const onSubmit = async (event) => {
      event.preventDefault();
      const request = { username, password, nickname, usertype };
      const response = await axios.post(`${Auth}/register`, request);
      const {
        data: { status },
      } = response;
      if (status === "success") {
        alert("회원가입에 성공하였습니다! 로그인 해주세요");
        history.replace("/");
      } else if (status === "error") {
        alert(response.data.error);
      }
    };

    return (
      <Container>
        <div className="loginContainer">
          <h1>과외 혜윰</h1>
          <form onSubmit={onSubmit}>
            <input
              placeholder="아이디"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              placeholder="비밀번호 확인"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {password !== confirmPassword ? <h4>비밀번호가 다릅니다</h4> : ""}
            <input
              placeholder="닉네임"
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
            <div className="selectContainer">
              <select
                value={usertype}
                onChange={(event) => setUsertype(event.target.value)}
              >
                <option value="student">학생</option>
                <option value="teacher">선생님</option>
              </select>
              <FontAwesomeIcon className="dropDown" icon={faAngleDown} />
            </div>
            <Button className="primaryColor" type="submit">
              회원가입
            </Button>
          </form>
        </div>
      </Container>
    );
  } else {
    const onSubmit = async (event) => {
      event.preventDefault();
      const request = { username, password };
      const response = await axios.post(`${Auth}/login`, request);
      const {
        data: { status, token },
      } = response;
      if (status === "success") {
        localStorage.setItem("token", token);
        history.go(0);
      } else {
        alert(response.data.error);
      }
    };
    const responseKaKao = async (res) => {
      const {
        profile: {
          id,
          properties: { nickname, profile_image },
        },
      } = res;

      const request = { id, nickname, profile_image };
      const response = await axios.post(`${Auth}/kakaoLogin`, request);
      const {
        data: { status, token },
      } = response;
      if (status === "success") {
        localStorage.setItem("token", token);
        history.go(0);
      }
    };

    return (
      <Container>
        <div className="loginContainer">
          <h1>과외 혜윰</h1>
          <form onSubmit={onSubmit}>
            <input
              placeholder="아이디"
              type="text"
              value={username}
              autoCapitalize="off"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button className="primaryColor" type="submit">
              로그인
            </Button>
          </form>
          <div className="buttonContainer">
            <Button
              className="secondaryColor"
              onClick={() => history.push("/register")}
            >
              회원가입
            </Button>
            <KaKaoLogin
              className="kakaoLogin"
              jskey={"28725562855bb20f5d88ee3ce511eb3f"}
              onSuccess={responseKaKao}
              onFail={() => alert("실패했습니다")}
              getProfile={true}
              style={{
                width: "100%",
                height: "100%",
                background: "none",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                cursor: "pointer",
              }}
            ></KaKaoLogin>
          </div>
        </div>
      </Container>
    );
  }
}

export default AuthPage;
