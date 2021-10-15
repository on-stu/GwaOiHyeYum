export const GET_QUIZES = "GET_QUIZES";

const quizesState = (quizState = [], action) => {
  switch (action.type) {
    case GET_QUIZES:
      return action.payload;
    default:
      return quizState;
  }
};

export default quizesState;
