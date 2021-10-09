import { faArrowDown, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BlankButton from "../../components/BlankButton";
import { getColor } from "../../lib/CustomFunctions";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    animation-duration: 1.5s;
    height: ${(props) => (props.opened ? "fit-content" : 0)};
    transition: ease-in-out;
    animation-name: ${(props) => (props.opened ? "opening" : "none")};
    overflow: hidden;
    margin-bottom: 10px;
  }
  .circle {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: wheat;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${getColor("blue")};
    color: whitesmoke;
  }
  .icon {
    transition: 550ms;
  }
  .icon.opened {
    transform: rotate(180deg);
  }

  @keyframes opening {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 500px;
    }
  }
`;

const ChapterAccordion = ({ index, title, paragraph }) => {
  const [opened, setOpened] = useState(false);
  useEffect(() => {}, [index]);

  return (
    <Container opened={opened}>
      <BlankButton onClick={() => setOpened(!opened)} width="100%">
        <div className="title">
          {index < 10 ? "0" + (index + 1) : index + 1}&nbsp;
          {title}
          <Button onClick={() => setOpened(!opened)}>
            <FontAwesomeIcon
              className={opened ? "icon" : "icon opened"}
              icon={faArrowDown}
            />
          </Button>
        </div>
      </BlankButton>
      <div className="content">
        <div>{paragraph}</div>
        <div>
          <BlankButton width="fit-content">
            <div className="circle">
              <FontAwesomeIcon icon={faListAlt} size="2x" />
            </div>
          </BlankButton>
        </div>
      </div>
    </Container>
  );
};

export default ChapterAccordion;
