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

export const getQuizList = (search: string) => {
  return apiClient(`${endpoints.quiz.next_list}?search=${search}`, {
    method: "GET",
  });
};

export const unlockRoom = (roomId: string) => {
  return apiClient(`${endpoints.quiz.next_unlockRoom}/${roomId}`, {
    method: "PUT",
  });
};
