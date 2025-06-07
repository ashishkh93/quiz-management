"use client";

import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  Info,
  MailIcon,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { QuizFormValues } from "@/lib/schema";
import { cn } from "@/lib/utils";
import InputField from "@/components/shared/input/InputField";
import DatePicker from "@/components/shared/datepicker/DatePicket";

interface QuizDetailsProps {
  form: UseFormReturn<QuizFormValues>;
}

export function QuizDetails({ form }: QuizDetailsProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;
  const joinType = watch("joinType");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-medium text-gray-700 mb-6">Quiz Details</h3>

      <div className="mb-6">
        <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="rounded-full bg-gray-100 p-2 mb-2">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </div>
          <p className="text-sm text-gray-500">
            Upload or Drag & Drop an image
          </p>
        </div>
      </div>

      <div className="mb-4">
        <InputField
          label="Quiz Title"
          id="title"
          name="title"
          register={register}
          placeholder="Enter quiz name"
          error={errors?.title?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <DatePicker
          id="date"
          label="Select Date"
          value={form.getValues("date")}
          setValue={form.setValue}
          error={errors?.date?.message}
        />

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="time"
              type="time"
              {...register("time")}
              className={cn(
                "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary",
                errors.time && "border-destructive focus:ring-destructive"
              )}
            />
          </div>
          {errors.time && (
            <p className="text-xs text-destructive mt-1">
              {errors.time.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Join Type
        </label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              id="unlimited"
              type="radio"
              value="unlimited"
              checked={joinType === "unlimited"}
              onChange={() => setValue("joinType", "unlimited")}
              className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
            />
            <label htmlFor="unlimited" className="ml-2 text-sm text-gray-700">
              Unlimited Join
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="restricted"
              type="radio"
              value="restricted"
              checked={joinType === "restricted"}
              onChange={() => setValue("joinType", "restricted")}
              className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
            />
            <label htmlFor="restricted" className="ml-2 text-sm text-gray-700">
              Restrict Join
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label
            htmlFor="maxUsers"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Max Users
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="maxUsers"
              type="number"
              {...register("maxUsers", { valueAsNumber: true })}
              placeholder="Enter Max Users"
              className={cn(
                "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary",
                errors.maxUsers && "border-destructive focus:ring-destructive"
              )}
            />
          </div>
          {errors.maxUsers && (
            <p className="text-xs text-destructive mt-1">
              {errors.maxUsers.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quizPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quiz Price
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <input
              id="quizPrice"
              type="number"
              {...register("quizPrice", { valueAsNumber: true })}
              placeholder="00"
              className={cn(
                "w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary",
                errors.quizPrice && "border-destructive focus:ring-destructive"
              )}
            />
          </div>
          {errors.quizPrice && (
            <p className="text-xs text-destructive mt-1">
              {errors.quizPrice.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="questionCountdown"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Q. Countdown
          </label>
          <div className="relative">
            <input
              id="questionCountdown"
              type="number"
              {...register("questionCountdown", { valueAsNumber: true })}
              placeholder="00"
              className={cn(
                "w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary",
                errors.questionCountdown &&
                  "border-destructive focus:ring-destructive"
              )}
            />
          </div>
          {errors.questionCountdown && (
            <p className="text-xs text-destructive mt-1">
              {errors.questionCountdown.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="moderator"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Assign Moderator
        </label>
        <select
          id="moderator"
          {...register("moderator")}
          className={cn(
            "w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary appearance-none bg-white",
            errors.moderator && "border-destructive focus:ring-destructive"
          )}
        >
          <option value="">Select</option>
          <option value="6838627c76736756555949b9">John Doe</option>
          <option value="6838627c76736756555949c0">Jane Smith</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {errors.moderator && (
          <p className="text-xs text-destructive mt-1">
            {errors.moderator.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="Enter Description"
          rows={4}
          className={cn(
            "w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-primary focus:border-primary",
            errors.description && "border-destructive focus:ring-destructive"
          )}
        />
        {errors.description && (
          <p className="text-xs text-destructive mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
}
