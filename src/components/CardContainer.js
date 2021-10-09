import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  height: fit-content;
  background-color: #ecf0f1;
  padding: 20px;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .title > span {
    cursor: pointer;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: fit-content;
  }
`;

function CardContainer({ title, children, moreOnClick }) {
  return (
    <Container>
      <div className="title">
        <h2>{title}</h2>
        <span onClick={moreOnClick}>더보기</span>
      </div>
      {children}
    </Container>
  );
}

export default CardContainer;
