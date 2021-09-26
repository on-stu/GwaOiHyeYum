import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import KaKaoLogin from "react-kakao-login";
import { Auth } from "../api/consts";

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
`;

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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
        properties: { nickname },
      },
    } = res;
    const request = { id, nickname };
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
            jskey={"4c29c3d6db416c3bbf28c6c1517a41ac"}
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

export default AuthPage;
