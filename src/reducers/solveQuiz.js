export const ADD_ANSWER = "ADD_ANSWER";
export const INIT_SOLVE = "INIT_SOLVE";
export const MODIFY_ANSWER = "MODIFY_ANSWER";

const solveQuizState = (solveQuizState = [], action) => {
  switch (action.type) {
    case INIT_SOLVE:
      return action.payload;
    case ADD_ANSWER:
      return [...solveQuizState, action.payload];
    case MODIFY_ANSWER:
      return action.payload;
    default:
      return solveQuizState;
  }
};

export default solveQuizState;
