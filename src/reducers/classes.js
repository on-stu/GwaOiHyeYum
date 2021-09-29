export const GET_MY_CLASSES = "GET_MY_CLASSES";
export const CREATE_CLASS = "CREATE_CLASS";

const classes = (classes = [], action) => {
  switch (action.type) {
    case GET_MY_CLASSES:
      return action.payload;
    case CREATE_CLASS:
      return classes;
    default:
      return classes;
  }
};

export default classes;
