"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizDetails } from "./quiz-details";
import { QuestionsSection } from "./questions-section";
import { toast } from "sonner";
import { quizSchema } from "@/utils/schema/quiz.schema";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { createNewQuiz } from "@/api-service/quiz.service";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";

const QuizForm: React.FC<{
  defaultQuizFormValues?: ExtendedQuizFormValues;
}> = ({ defaultQuizFormValues }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

  const form = useForm<Partial<QuizFormValues>>({
    resolver: zodResolver(quizSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultQuizFormValues) {
      form.reset(defaultQuizFormValues);
    }
  }, [defaultQuizFormValues, form]);

  const onSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    const allVals = form.getValues() as QuizFormValues;
    const actualVals = Object.fromEntries(
      Object.entries(data).map(([key, _value]) => [
        key,
        allVals[key as keyof QuizFormValues],
      ])
    );
    console.log("actualVals: ", actualVals);

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      Object.entries(actualVals).forEach(([key, value]) => {
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
        router.push(
          `${paths.quiz_management.schedule(quizRes?.data?.quiz?._id)}`
        );
        toast.success(quizRes?.message ?? "Quiz created successfully!");
        // form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(form.formState?.errors, "errors==");

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
