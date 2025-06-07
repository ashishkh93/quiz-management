"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Trash, Plus, Info } from "lucide-react";
import { QuizFormValues } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  index: number;
  form: UseFormReturn<QuizFormValues>;
  onRemove: (index: number) => void;
}

export function QuestionCard({ index, form, onRemove }: QuestionCardProps) {
  const { register, formState: { errors }, setValue, watch } = form;
  const correctAnswer = watch(`questions.${index}.correctAnswer`);
  const options = watch(`questions.${index}.options`) || ["", "", "", ""];

  const handleAddOption = () => {
    const currentOptions = [...options];
    currentOptions.push("");
    setValue(`questions.${index}.options`, currentOptions);
  };

  const handleRemoveOption = (optionIndex: number) => {
    const currentOptions = [...options];
    currentOptions.splice(optionIndex, 1);
    setValue(`questions.${index}.options`, currentOptions);
    
    // Update correctAnswer if needed
    if (correctAnswer === optionIndex) {
      setValue(`questions.${index}.correctAnswer`, 0);
    } else if (correctAnswer > optionIndex) {
      setValue(`questions.${index}.correctAnswer`, correctAnswer - 1);
    }
  };

  const handleSetCorrectAnswer = (optionIndex: number) => {
    setValue(`questions.${index}.correctAnswer`, optionIndex);
  };

  return (
    <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-700">Question {index + 1}</h3>
          {errors.questions?.[index] && (
            <div className="text-xs text-destructive flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Please complete this question</span>
            </div>
          )}
        </div>
        <button 
          type="button"
          onClick={() => onRemove(index)}
          className="text-gray-500 hover:text-destructive transition-colors"
          aria-label="Remove question"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Info className="h-4 w-4 text-gray-400" />
          <input
            {...register(`questions.${index}.question`)}
            placeholder="Enter your question here"
            className={cn(
              "w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary",
              errors.questions?.[index]?.question && "border-destructive focus:ring-destructive"
            )}
          />
        </div>
        {errors.questions?.[index]?.question && (
          <p className="text-xs text-destructive mt-1 ml-6">
            {errors.questions?.[index]?.question?.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((_, optionIndex) => (
          <div key={optionIndex} className="mb-3">
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-600">Option {optionIndex + 1}</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={correctAnswer === optionIndex}
                onChange={() => handleSetCorrectAnswer(optionIndex)}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <input
                {...register(`questions.${index}.options.${optionIndex}`)}
                placeholder={`Option ${optionIndex + 1}`}
                className={cn(
                  "flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary",
                  errors.questions?.[index]?.options?.[optionIndex] && "border-destructive focus:ring-destructive"
                )}
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(optionIndex)}
                className="text-gray-500 hover:text-destructive transition-colors"
                aria-label="Remove option"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
            {errors.questions?.[index]?.options?.[optionIndex] && (
              <p className="text-xs text-destructive mt-1 ml-6">
                {errors.questions?.[index]?.options?.[optionIndex]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {options.length < 6 && (
        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          <Plus className="h-3 w-3" />
          <span>Add Option</span>
        </button>
      )}
    </div>
  );
}