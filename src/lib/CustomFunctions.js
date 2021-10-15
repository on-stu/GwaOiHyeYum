import {
  faBook,
  faBrain,
  faCheck,
  faClipboard,
  faPaperclip,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API, Auth, Classes } from "../api/consts";

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
    case "brain":
      return faBrain;
    default:
      return displayIcon;
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
    case "skyblue":
      return "#95c4cc";
    default:
      return color;
  }
};

export const getQuiz = async (id) => {
  try {
    const quiz = await axios.post(`${API}/quiz/getQuiz`, { id: id });
    return quiz;
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async (id) => {
  try {
    const profile = await axios.post(`${Auth}/getUserProfile`, { id: id });
    return profile;
  } catch (error) {
    return error;
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

export const updateUser = async (updatedUser) => {
  const response = await axios.post(`${Auth}/updateUser`, { updatedUser });
  return response;
};

export const followUser = async (fromId, toId) => {
  const response = await axios.post(`${Auth}/followUser`, { fromId, toId });
  return response;
};

export const followCancel = async (fromId, toId) => {
  const response = await axios.post(`${Auth}/followCancel`, { fromId, toId });
  return response;
};
