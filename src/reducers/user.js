export const GET_USER_OBJ = "GET_USER_OBJ";

const user = (user = {}, action) => {
  switch (action.type) {
    case GET_USER_OBJ:
      return action.payload;
    default:
      return user;
  }
};

export default user;
