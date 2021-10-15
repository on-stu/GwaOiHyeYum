export const GET_QUIZ = "GET_QUIZ";
export const MODIFY_QUIZ = "MODIFY_QUIZ";

const quizState = (
  quizState = {
    title: "",
    creatorId: "",
    createdAt: "",
    likes: [],
    comments: [],
    addedTo: [],
    quizType: "",
    quiz: [],
    quizIntroduction: "",
  },
  action
) => {
  switch (action.type) {
    case GET_QUIZ:
      return action.payload;
    case MODIFY_QUIZ:
      return action.payload;
    default:
      return quizState;
  }
};

export default quizState;
