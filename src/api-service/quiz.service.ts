import { endpoints } from "@/utils/server/axios";
import { apiClient } from "@/utils/server/client-api";

export const createNewQuiz = (data: FormData) => {
  return apiClient(endpoints.quiz.next_create, {
    method: "POST",
    data,
  });
};

export const getQuizDetail = (id: string) => {
  return apiClient(`${endpoints.quiz.next_detail}/${id}`, {
    method: "GET",
  }) as Promise<IQuizDetailApiRes>;
};

export const getQuizList = (data: QuizListAPiParams) => {
  return apiClient(endpoints.quiz.next_list, {
    method: "POST",
    data,
  });
};

export const unlockRoom = (roomId: string) => {
  return apiClient(`${endpoints.quiz.next_unlockRoom}/${roomId}`, {
    method: "PUT",
  });
};

export const addNewQuestionInQuiz = (
  data: Partial<ExtendedQuizFormValues>,
  quizId: string
) => {
  return apiClient(endpoints.quiz.next_que_create(quizId), {
    method: "POST",
    data,
  });
};

export const addAnnouncementForQuiz = (
  data: AddAnnouncementForQuizApiParams
) => {
  return apiClient(endpoints.quiz.next_announcement_create, {
    method: "POST",
    data,
  });
};
