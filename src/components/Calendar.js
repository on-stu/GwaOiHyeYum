import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const EachDate = styled.div`
  width: auto;
  height: auto;
  padding: 5px;
  box-sizing: border-box;
  background-color: #ecf0f1;
`;

const Container = styled.div`
  display: grid;
  grid-gap: 1px;
  background-color: black;
  width: 100%;
  height: auto;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid black;

  @media screen and (max-width: 1024px) {
    height: 200px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Calendar() {
  const [calendarObj, setCalendarObj] = useState();

  let nowDate;
  const calendarMaker = (date) => {
    if (!date) {
      date = new Date();
    }
    nowDate = date;
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth();

    const thisMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
    const thisLastDay = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth() + 1,
      0
    );

    let count = 0;
    let output = [];
    let rests = [];
    let restToggle = false;

    let i;
    for (i = 0; i < thisMonth.getDay(); i++) {
      output.push(0);
      count++;
    }

    for (i = 1; i <= thisLastDay.getDate(); i++) {
      if (count % 7 === 0) {
        output.push("/");
      }
      const day = new Date(year, month, i);
      output.push({ day });
      count++;
    }

    for (i = 0; i < output.length; i++) {
      if (restToggle) {
        rests.push(output[i]);
        if (output[i] === "/") {
          if (rests.length === 8) {
            rests = [];
          }
          restToggle = !restToggle;
        }
      }
      if (output[i] === "/") {
        restToggle = !restToggle;
      }
    }
    for (i = 0; i < 7 - rests.length; i++) {
      output.push(0);
    }

    return { year, month, output };
  };

  useEffect(() => {
    setCalendarObj(calendarMaker());
  }, []);
  return (
    <>
      <Top>
        <span>{calendarObj && calendarObj.year}년</span>
        <span>
          <h2>{calendarObj && calendarObj.month + 1}월</h2>
        </span>
        <span>
          <Button>
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={() => {
                const newDate = new Date(
                  calendarObj.year,
                  calendarObj.month - 1
                );
                setCalendarObj(calendarMaker(newDate));
              }}
            />
          </Button>
          <Button>
            <FontAwesomeIcon
              icon={faArrowRight}
              onClick={() => {
                const newDate = new Date(
                  calendarObj.year,
                  calendarObj.month + 1
                );
                setCalendarObj(calendarMaker(newDate));
              }}
            />
          </Button>
        </span>
      </Top>
      <Container>
        {calendarObj &&
          calendarObj.output.map((item) => {
            if (item !== "/" && item !== 0) {
              return (
                <EachDate key={item.day.getDate()}>
                  {item.day.getDate()}
                </EachDate>
              );
            } else if (item === 0) {
              return <EachDate key={Math.random()}></EachDate>;
            }
          })}
      </Container>
    </>
  );
}

export default Calendar;
