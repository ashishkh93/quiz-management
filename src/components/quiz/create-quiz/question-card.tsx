"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Trash, Plus, Info, Minus, Trash2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import InputField from "@/components/shared/input/InputField";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionCardProps {
  index: number;
  form: UseFormReturn<QuizFormValues>;
  onRemove: (index: number) => void;
}

export function QuestionCard({ index, form, onRemove }: QuestionCardProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;
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
    <div className="bg-gray-50 border rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-start">
          <div className="font-medium">Question {index + 1}</div>
          {errors.questions?.[index] && (
            <div className="text-xs text-destructive flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Please complete this question</span>
            </div>
          )}
        </div>
        {index !== 0 && (
          <Button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 text-red-500 hover:!bg-red-100 rounded-md !bg-white cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 my-4">
        <HelpCircle className="text-gray-500 w-5 h-5" />
        <InputField
          id={`questions.${index}.question`}
          name={`questions.${index}.question`}
          register={register}
          placeholder="Enter quiz name"
          error={errors.questions?.[index]?.question?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((_: any, optionIndex: number) => (
          <div key={optionIndex} className="mb-3">
            <div className="flex justify-between mb-1">
              <label className="text-sm text-gray-600">
                Option {optionIndex + 1}
              </label>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2 w-full border rounded-md p-2">
                <Checkbox
                  checked={correctAnswer === optionIndex}
                  onCheckedChange={() => handleSetCorrectAnswer(optionIndex)}
                  className="w-4 h-4 !border-gray-400"
                />
                <InputField
                  id={`questions.${index}.options.${optionIndex}`}
                  name={`questions.${index}.options.${optionIndex}`}
                  register={register}
                  placeholder={`Option ${optionIndex + 1}`}
                  // error={errors.questions?.[index]?.options?.[optionIndex]?.message}
                  className="h-8 !border-0 !pl-0 !shadow-none"
                />
              </div>
              {optionIndex === options.length - 1 ? (
                <div
                  className="p-4 border rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={handleAddOption}
                >
                  <Plus className="w-4 h-4 text-black !cursor-pointer" />
                </div>
              ) : (
                <div
                  className="p-4 border rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleRemoveOption(optionIndex)}
                >
                  <Trash2 className="w-4 h-4 text-black !cursor-pointer" />
                </div>
              )}
            </div>
            {errors.questions?.[index]?.options?.[optionIndex] && (
              <p className="text-xs text-destructive mt-1 ml-2">
                {errors.questions?.[index]?.options?.[optionIndex]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* {options.length < 6 && (
        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          <Plus className="h-3 w-3" />
          <span>Add Option</span>
        </button>
      )} */}
    </div>
  );
}
