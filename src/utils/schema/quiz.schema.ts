import { z } from "zod";

export const questionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  options: z
    .array(z.string().min(1, "Option is required"))
    .min(2, "At least 2 options are required"),
  correctAnswer: z.number().min(0, "Correct answer is required"),
  isHidden: z.boolean().default(false),
});

export const quizSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  joinType: z.enum(["unlimited", "restricted"]),
  maxUsers: z.number().default(0),
  quizPrice: z.number().min(0, "Price must be a positive number"),
  questionCountdown: z.number().min(1, "Countdown must be at least 1 second"),
  description: z.string().min(1, "Description is required"),
  moderator: z.string().min(1, "Moderator is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
  questionTypes: z.literal("MCQ"),
});
