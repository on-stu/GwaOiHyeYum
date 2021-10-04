export const GET_MY_FOLLOWINGS = "GET_MY_FOLLOWINGS";

const followings = (followings = [], action) => {
  switch (action.type) {
    case GET_MY_FOLLOWINGS:
      return action.payload;
    default:
      return followings;
  }
};

export default followings;
