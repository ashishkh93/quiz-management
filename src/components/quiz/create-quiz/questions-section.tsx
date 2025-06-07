"use client";

import { UseFormReturn } from "react-hook-form";
import { QuizFormValues } from "@/lib/schema";
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
    <div>
      <h3 className="font-medium text-gray-700 mb-6">Questions</h3>

      <div className="space-y-3">
        {watch()?.questions?.map((_, index) => (
          <div key={index} className="relative">
            <QuestionCard index={index} form={form} onRemove={removeQuestion} />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center gap-2 text-gray-600 transition-colors cursor-pointer hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
          <span>Add Question</span>
        </button>
      </div>
    </div>
  );
}
