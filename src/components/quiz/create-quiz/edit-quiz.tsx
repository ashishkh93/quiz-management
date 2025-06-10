"use client";

import React, { useEffect, useState } from "react";
import QuizForm from "./quiz-form";
import { toast } from "sonner";
import { getQuizDetail } from "@/api-service/quiz.service";

type EditQuizProps = {
  quizId: string;
};

const EditQuiz = ({ quizId }: EditQuizProps) => {
  const [quizData, setQuizData] = useState<ExtendedQuizFormValues>({});

  useEffect(() => {
    onload();
  }, []);

  const onload = async () => {
    const quizRes = (await getQuizDetail(quizId)) as IQuizDetailApiRes;

    if (!quizRes.status) {
      toast.error(quizRes?.message || "Failed to get quiz details");
    }

    setQuizData(quizRes.data?.data);
  };

  return (
    <QuizForm
      defaultQuizFormValues={{
        ...quizData,
        date: quizData.scheduledDate ?? "",
        image: quizData.image
          ? `${process.env.NEXT_PUBLIC_SERVER_URL_IMAGE}/${quizData.image}`
          : "",
      }}
    />
  );
};

export default EditQuiz;
