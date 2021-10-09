import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getClass } from "../../lib/CustomFunctions";
import styled from "styled-components";
import ClassInfoCard from "./ClassInfoCard";
import BlankButton from "../../components/BlankButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ChapterAccordion from "./ChapterAccordion";
import { curriculum } from "../../api/Mock";

const ClassContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;

  .container {
    margin-top: 20px;
    width: 60%;
    height: fit-content;
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
  .between {
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: 100%;
    justify-content: space-between;
    .left {
      display: flex;
      column-gap: 10px;
      align-items: center;
    }
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

const ColumnContainer = styled.div`
  width: 60%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  .container {
    width: 100%;
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

function ClassPage({ match }) {
  const {
    params: { classId },
  } = match;

  const history = useHistory();

  const [thisClass, setThisClass] = useState();

  useEffect(() => {
    getClass(classId).then((res) => {
      if (res.data.status === "success") {
        setThisClass(res.data.thisClass[0]);
        console.log(thisClass);
      } else {
        alert("수업 정보를 찾을 수 없습니다.");
        history.go(-1);
      }
    });
  }, [classId]);
  return (
    <>
      {thisClass && (
        <ClassContainer>
          <div className="container">
            <ClassInfoCard
              classId={classId}
              classTitle={thisClass.classTitle}
              iconColor={thisClass.iconColor}
              students={thisClass.students}
              displayIcon={thisClass.displayIcon}
              teacherNickname={thisClass.teacherNickname}
            />
          </div>
          <ColumnContainer>
            <div className="container">
              <span className="between">
                <span className="left">
                  <h3>커리큘럼</h3>
                  {curriculum.length}
                </span>
                <BlankButton width="fit-content">
                  <span
                    style={{
                      display: "flex",
                      columnGap: "4px",
                      color: "gray",
                      alignItems: "center",
                    }}
                  >
                    <span>관리</span>
                    <FontAwesomeIcon icon={faCog} />
                  </span>
                </BlankButton>
              </span>
              <span>
                {curriculum.map((item, key) => (
                  <ChapterAccordion
                    key={key}
                    index={key}
                    title={item.title}
                    paragraph={item.paragraph}
                    assignment={item.assignment}
                    quizes={item.quizes}
                  />
                ))}
              </span>
            </div>
          </ColumnContainer>
        </ClassContainer>
      )}
    </>
  );
}

export default ClassPage;
