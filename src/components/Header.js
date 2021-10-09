import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
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
  z-index: 100;
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
      cursor: pointer;
    }
  }
`;

function Header() {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user);

  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <HeaderContainer>
        <div className="container">
          <div className="left">
            <FontAwesomeIcon
              id="icon"
              icon={sidebar ? faTimes : faBars}
              onClick={() => setSidebar(!sidebar)}
            />
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
      <Sidebar visible={sidebar}>
        <div className={sidebar ? "navContainer active" : "navContainer"}></div>
      </Sidebar>
      <BlurBackground visible={sidebar} />
    </>
  );
}

const Sidebar = styled.div`
  position: fixed;
  background-color: ${(props) =>
    props.visible ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  z-index: 100;
  top: 64px;
  left: 0;
  width: fit-content;
  height: 100%;

  .navContainer {
    position: fixed;
    left: -100%;
    width: 55%;
    height: 100%;
    background-color: #2c3e50;
    transition: 850ms;
  }

  .navContainer.active {
    left: 0;
  }
`;

const BlurBackground = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  background-color: ${(props) =>
    props.visible ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default Header;
