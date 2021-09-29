import {
  faBook,
  faCheck,
  faClipboard,
  faPaperclip,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Auth, Classes } from "../api/consts";

export const getDisplayIcon = (displayIcon) => {
  switch (displayIcon) {
    case "book":
      return faBook;
    case "check":
      return faCheck;
    case "clipboard":
      return faClipboard;
    case "clip":
      return faPaperclip;
    case "postit":
      return faStickyNote;
    default:
      return faBook;
  }
};

export const getColor = (color) => {
  switch (color) {
    case "white":
      return "#f5f5f5";
    case "green":
      return "#2ecc71";
    case "blue":
      return "#4b7bec";
    case "red":
      return "#e74c3c";
    case "purple":
      return "#9b59b6";
    default:
      return "#000000";
  }
};

export const getUserProfile = async (id) => {
  try {
    const profile = await axios.post(`${Auth}/getUserProfile`, { id: id });
    return profile;
  } catch (error) {
    console.log(error);
  }
};

export const getClass = async (id) => {
  try {
    const thisClass = await axios.post(`${Classes}/getClass`, { id: id });
    return thisClass;
  } catch (error) {
    console.log(error);
  }
};
