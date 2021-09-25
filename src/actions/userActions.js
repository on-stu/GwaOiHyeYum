import axios from "axios";
import { Auth } from "../api/consts";
import { GET_USER_OBJ } from "../reducers/user";

export const getUserObj = (token) => async (dispatch) => {
  try {
    const response = await axios.post(`${Auth}/getUserObj`, { token });
    const {
      data: { user },
    } = response;

    dispatch({ type: GET_USER_OBJ, payload: user });
  } catch (error) {
    dispatch({ type: GET_USER_OBJ, payload: false });
  }
};
