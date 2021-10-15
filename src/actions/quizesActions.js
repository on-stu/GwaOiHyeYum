import axios from "axios";
import { API } from "../api/consts";
import { GET_QUIZES } from "../reducers/quizes";

export const getMyQuizes = (userInfo) => async (dispatch) => {
  try {
    const response = await axios.post(`${API}/quiz/getQuizes`, userInfo);
    const {
      data: { quizes },
    } = response;
    dispatch({ type: GET_QUIZES, payload: quizes });
  } catch (error) {
    console.log(error);
  }
};
