import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import BlankButton from "./BlankButton";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ecf0f1;
  width: 100%;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    height: 80px;
  }
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 16px;
  }
  .left #icon {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    position: sticky;
    top: 0;
    .container {
      width: 90%;
      height: 64px;
    }
    .left #icon {
      display: flex;
    }
  }
`;

function Header() {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user);

  return (
    <HeaderContainer>
      <div className="container">
        <div className="left">
          <FontAwesomeIcon id="icon" icon={faBars} />
          <BlankButton onClick={() => history.push("/")}>
            <h2>과외 혜윰</h2>
          </BlankButton>
        </div>
        <div>
          <Button onClick={() => history.push(`/profile/${userInfo._id}`)}>
            내 프로필
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              history.push("/");
              history.go(0);
            }}
          >
            로그아웃
          </Button>
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Header;
