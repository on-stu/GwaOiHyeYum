import axios from "axios";
import { API } from "../api/consts";
import { DISLIKE_QUIZ, LIKE_QUIZ } from "../reducers/quiz";

export const likeQuiz = async (quizId, userId) => {
  try {
    const request = { quizId, userId };
    const quizResponse = await axios.post(`${API}/quiz/like`, request);
    return quizResponse;
  } catch (error) {
    console.log(error);
  }
};

export const dislikeQuiz = async (quizId, userId) => {
  try {
    const request = { quizId, userId };
    const response = await axios.post(`${API}/quiz/dislike`, request);
    return response;
  } catch (error) {
    console.log(error);
  }
};
