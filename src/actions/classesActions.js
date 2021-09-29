import axios from "axios";
import { Classes } from "../api/consts";
import { CREATE_CLASS, GET_MY_CLASSES } from "../reducers/classes";

export const getMyClasses = (userInfo) => async (dispatch) => {
  try {
    const response = await axios.post(`${Classes}/getClasses`, userInfo);
    const {
      data: { userClasses },
    } = response;
    dispatch({ type: GET_MY_CLASSES, payload: userClasses });
  } catch (error) {
    console.log(error);
  }
};

export const createClass = (request) => async (dispatch) => {
  try {
    console.log(request);
    const response = await axios.post(`${Classes}/create`, request);
    console.log(response);
    dispatch({ type: CREATE_CLASS, payload: request });
    return 0;
  } catch (error) {
    console.log(error);
  }
};
