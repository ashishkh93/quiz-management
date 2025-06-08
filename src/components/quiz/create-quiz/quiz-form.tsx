"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizDetails } from "./quiz-details";
import { QuestionsSection } from "./questions-section";
import { toast } from "sonner";
import { quizSchema } from "@/utils/schema/quiz.schema";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { createNewQuiz } from "@/api-service/quiz.service";

const QuizForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<QuizFormValues> = {
    title: "",
    date: "",
    time: "",
    joinType: "unlimited",
    maxUsers: 100,
    quizPrice: 0,
    questionCountdown: 10,
    description: "",
    moderator: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        isHidden: false,
      },
    ],
    questionTypes: "MCQ",
  };

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    try {
      setIsSubmitting(true);

      data = {
        ...data,
        moderator: "6838627c76736756555949b9",
      };

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "questions") {
          // Send entire questions array as JSON
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value)); // optional: depends on backend
        } else if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value)); // e.g., nested objects
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const quizRes = (await createNewQuiz(formData)) as IDefaultResponse;

      if (!quizRes.status) {
        toast.error(quizRes?.message ?? "Quiz created successfully!");
      } else {
        toast.success(quizRes?.message ?? "Quiz created successfully!");
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <QuizDetails form={form} />
        </div>
        <div>
          <QuestionsSection form={form} />
        </div>
      </div>

      <div className="mt-8">
        <GradientButton
          fromGradient="from-[#0E76BC]"
          toGradient="to-[#283891] w-36"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Next"}
        </GradientButton>
      </div>
    </form>
  );
};

export default QuizForm;
