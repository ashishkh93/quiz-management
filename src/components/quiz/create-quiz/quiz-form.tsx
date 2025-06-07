"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizDetails } from "./quiz-details";
import { QuestionsSection } from "./questions-section";
import { toast } from "sonner";
import { quizSchema } from "@/utils/schema/quiz.schema";

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
      // Here you would typically send the data to your API
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Quiz created successfully!");
      // Optionally reset the form or redirect
      // form.reset();
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed w-40"
        >
          {isSubmitting ? "Creating..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default QuizForm;
