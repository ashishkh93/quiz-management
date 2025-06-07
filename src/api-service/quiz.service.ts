import { endpoints } from "@/utils/server/axios";
import { apiClient } from "@/utils/server/client-api";

export const createNewQuiz = (data: Partial<QuizFormValues>) => {
  return apiClient(endpoints.quiz.next_create, {
    method: "POST",
    data,
  });
};
