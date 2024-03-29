import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  height: 100%;
  background-color: #ecf0f1;
  padding: 20px;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  h2 {
    margin-bottom: 24px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: fit-content;
  }
`;

function BigCard({ children }) {
  return (
    <Container>
      <h4>{children}</h4>
    </Container>
  );
}

export default BigCard;
