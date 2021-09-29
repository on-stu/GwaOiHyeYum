import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
`;

function Footer() {
  return (
    <FooterContainer>
      <span>과외 혜윰 :: 과외 도우미 서비스</span>
      <span>대표 김민수 계좌 : 3333-05-4873369(카카오뱅크)</span>
    </FooterContainer>
  );
}

export default Footer;
