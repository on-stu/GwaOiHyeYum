import React from "react";
import styled from "styled-components";

function BlankButton({ onClick, children, width }) {
  return (
    <StyledButton onClick={onClick} width={width}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  width: ${(props) => (props.width ? props.width : "100%")};
  font-size: 18px;
  height: fit-content;
  background-color: transparent;
  :focus {
    background-color: gray;
  }
`;
export default BlankButton;
