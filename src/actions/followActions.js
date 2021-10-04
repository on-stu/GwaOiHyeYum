import axios from "axios";
import { Auth } from "../api/consts";
import { GET_MY_FOLLOWINGS } from "../reducers/followings";
import { GET_MY_FOLLOWERS } from "../reducers/follwers";

export const getMyFollowers = (followers) => async (dispatch) => {
  try {
    const response = await axios.post(`${Auth}/getUsers`, followers);
    if (response.data.status === "success") {
      const {
        data: { users },
      } = response;
      dispatch({ type: GET_MY_FOLLOWERS, payload: users });
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyFollowings = (followings) => async (dispatch) => {
  try {
    const response = await axios.post(`${Auth}/getUsers`, followings);
    if (response.data.status === "success") {
      const {
        data: { users },
      } = response;
      dispatch({ type: GET_MY_FOLLOWINGS, payload: users });
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};
