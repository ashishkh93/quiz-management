"use client";

import { UseFormReturn } from "react-hook-form";
import { QuestionCard } from "./question-card";
import { Plus, Minus } from "lucide-react";

interface QuestionsSectionProps {
  form: UseFormReturn<QuizFormValues>;
}

export function QuestionsSection({ form }: QuestionsSectionProps) {
  const { setValue, getValues, watch } = form;

  const addQuestion = () => {
    const questions = getValues("questions") || [];
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      isHidden: false,
    };
    setValue("questions", [...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    const questions = getValues("questions");
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setValue("questions", newQuestions);
  };

  return (
    <>
      <div className="flex flex-col max-h-[calc(100vh-150px)] overflow-hidden">
        <h3 className="font-medium text-gray-700 mb-6">Questions</h3>

        <div className="space-y-3 overflow-y-auto pr-2 !flex-1">
          {watch()?.questions?.map((_, index: number) => (
            <div key={index} className="relative">
              <QuestionCard
                index={index}
                form={form}
                onRemove={removeQuestion}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={addQuestion}
        className="w-full mt-2 py-3 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center gap-2 text-gray-600 transition-colors cursor-pointer hover:bg-gray-100"
      >
        <Plus className="h-4 w-4" />
        <span>Add Question</span>
      </button>
    </>
  );
}
