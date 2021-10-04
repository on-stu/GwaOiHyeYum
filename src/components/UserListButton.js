import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import BlankButton from "./BlankButton";
import Modal from "./Modal";
import NotYet from "./NotYet";
import ProfileCard from "./ProfileCard";

const Container = styled.div`
  span {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 10px;
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

function UserListButton({ children, users, title, type }) {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const onClick = (link) => {
    history.push(`/profile/${link}`);
    setVisible(false);
  };

  return (
    <>
      <Modal visible={visible}>
        <ModalContainer>
          <div className="top">
            <h4>{title}</h4>
            <BlankButton width="fit-content" onClick={() => setVisible(false)}>
              <FontAwesomeIcon icon={faWindowClose} style={{ color: "gray" }} />
            </BlankButton>
          </div>
          {users && users.length > 0 ? (
            users.map((follower) => (
              <BlankButton
                key={follower._id}
                onClick={() => onClick(follower._id)}
              >
                <ProfileCard
                  userId={follower._id}
                  userNickname={follower.nickname}
                  userPhotoURL={follower.photoURL}
                  userType={follower.usertype}
                />
              </BlankButton>
            ))
          ) : (
            <NotYet
              placeholder={
                type === "following"
                  ? "팔로잉이 없습니다."
                  : "팔로워가 없습니다."
              }
            />
          )}
        </ModalContainer>
      </Modal>

      <Container>
        <BlankButton onClick={() => setVisible(true)}>{children}</BlankButton>
      </Container>
    </>
  );
}

export default UserListButton;
