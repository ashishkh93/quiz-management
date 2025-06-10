import React, { useEffect } from "react";
import { QuestionsSection } from "./questions-section";
import { onlyQuestionsSchema } from "@/utils/schema/quiz.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";

type AddQuizQuestionsProps = {
  quizData: ExtendedQuizFormValues;
};

const AddQuizQuestions: React.FC<AddQuizQuestionsProps> = ({ quizData }) => {
  const form = useForm({
    resolver: zodResolver(onlyQuestionsSchema),
    defaultValues: {
      questions: quizData.questions ?? [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (quizData?.questions) {
      form.reset({ questions: quizData.questions });
    }
  }, [quizData?.questions, form]);

  const onSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    console.log(data, "data==");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="font-bold text-xl text-gray-700 mb-6">Add Questions</div>
      <Card className="p-6">
        <QuestionsSection form={form} hideTitle />
      </Card>
      <div className="mt-6">
        <div className="flex justify-start space-x-4">
          <button
            type="button"
            className="h-10 w-full sm:w-[200px] px-4 !py-[2px] border border-[#283891] rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
          <GradientButton
            fromGradient="from-[#0E76BC]"
            toGradient="to-[#283891]"
            className="w-[200px]"
            type="submit"
          >
            ADD
          </GradientButton>
        </div>
      </div>
    </form>
  );
};

export default AddQuizQuestions;
