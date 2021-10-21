import React from "react";
import BlankButton from "./BlankButton";
import { getColor } from "../lib/CustomFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MaterialButton({ text, onClick, icon, color }) {
  return (
    <BlankButton width="fit-content" onClick={onClick}>
      <span
        style={{
          display: "flex",
          columnGap: "4px",
          color: "whitesmoke",
          alignItems: "center",
          backgroundColor: getColor(color),
          padding: "10px",
          borderRadius: "5px",
          width: "100%",
        }}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        <span>{text}</span>
      </span>
    </BlankButton>
  );
}

export default MaterialButton;
