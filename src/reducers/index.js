import { combineReducers } from "redux";

import user from "./user";
import classes from "./classes";
import followers from "./follwers";
import followings from "./followings";
import quizState from "./quiz";

export default combineReducers({
  user,
  classes,
  followers,
  followings,
  quizState,
});
