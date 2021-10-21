export const INIT_QUIZ = "INIT_QUIZ";
export const GET_QUIZ = "GET_QUIZ";
export const MODIFY_QUIZ = "MODIFY_QUIZ";
export const LIKE_QUIZ = "LIKE_QUIZ";
export const DISLIKE_QUIZ = "DISLIKE_QUIZ";
export const SOLVE_QUIZ = "SOLVE_QUIZ";
export const INIT_SOLVE_QUIZ = "INIT_SOLVE_QUIZ";

const initialQuizState = {
  title: "",
  creatorId: "",
  createdAt: "",
  likes: [],
  comments: [],
  addedTo: [],
  quizType: "",
  quiz: [],
  quizSolve: [],
  quizIntroduction: "",
};

const quizState = (quizState = initialQuizState, action) => {
  switch (action.type) {
    case INIT_QUIZ:
      return initialQuizState;
    case GET_QUIZ:
      return action.payload;
    case MODIFY_QUIZ:
      return action.payload;
    case SOLVE_QUIZ:
      return {
        ...quizState,
        quizSolve: quizState.quizSolve.map((item, index) => {
          if (index === action.index) {
            return { ...item, myAnswer: action.payload };
          } else {
            return item;
          }
        }),
      };
    case INIT_SOLVE_QUIZ:
      return {
        ...quizState,
        quizSolve: quizState.quiz.map((item, index) => ({
          index,
          problem: item.problem,
          word: item.word,
          answer: item.answer,
          meaning: item.meaning,
          myAnswer: "",
        })),
      };
    case LIKE_QUIZ:
      return { ...quizState, likes: [...quizState.likes, action.payload] };
    case DISLIKE_QUIZ:
      return {
        ...quizState,
        likes: quizState.likes.filter((elm) => elm !== action.payload),
      };
    default:
      return quizState;
  }
};

export default quizState;
