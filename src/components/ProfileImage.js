import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ProfileContainer = styled.div`
  width: 100px;
  height: 100px;
  ${(props) =>
    props.photoURL
      ? "background-image: url(" + props.photoURL + ");"
      : "background-color: #bdc3c7;"}
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
`;

export function ProfileImage({ photoURL }) {
  return (
    <>
      {photoURL ? (
        <ProfileContainer photoURL={photoURL} />
      ) : (
        <FontAwesomeIcon icon={faUserAlt} size="5x" style={{ color: "gray" }} />
      )}
    </>
  );
}
