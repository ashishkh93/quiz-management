"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getQuizDetail } from "@/api-service/quiz.service";
import AddQuizQuestions from "./add-quiz-questions";

type EditQuizProps = {
  quizId: string;
};

const AddQuizQuestion = ({ quizId }: EditQuizProps) => {
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

  return <AddQuizQuestions quizData={quizData} quizId={quizId} />;
};

export default AddQuizQuestion;
