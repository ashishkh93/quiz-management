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
import axios from "axios";

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

      console.log("Form submitted:", data);

      const quizRes = (await createNewQuiz(data)) as IDefaultResponse;

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
