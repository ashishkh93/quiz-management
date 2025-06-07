import { z } from "zod";
import { loginSchema } from "./login.schema";
import { quizSchema } from "./quiz.schema";

declare global {
  type LoginFormData = z.infer<typeof loginSchema>;
  type QuizFormValues = z.infer<typeof quizSchema>;
}
