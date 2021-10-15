import styled from "styled-components";
import { getColor } from "../lib/CustomFunctions";

export const OButton = styled.div`
  color: whitesmoke;
  background-color: ${(props) => (props.selected ? getColor("blue") : "gray")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  cursor: pointer;
`;

export const XButton = styled.div`
  color: whitesmoke;
  background-color: ${(props) => (props.selected ? getColor("red") : "gray")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  cursor: pointer;
`;
