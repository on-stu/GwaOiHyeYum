import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  border-radius: 10px;
  border: none;
  outline: none;
  resize: none;
  height: 200px;
  font-size: 15px;
  padding: 15px;
  box-sizing: border-box;
`;

function TextArea({ value, onChange }) {
  return (
    <StyledTextArea
      value={value}
      onChange={onChange}
      maxLength={300}
      placeholder="자기소개글을 작성해주세요!"
    ></StyledTextArea>
  );
}

export default TextArea;
