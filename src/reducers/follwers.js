export const GET_MY_FOLLOWERS = "GET_MY_FOLLOWERS";

const followers = (followers = [], action) => {
  switch (action.type) {
    case GET_MY_FOLLOWERS:
      return action.payload;
    default:
      return followers;
  }
};

export default followers;
