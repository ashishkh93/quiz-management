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
import { cn } from "@/lib/utils";
import InputField from "@/components/shared/input/InputField";
import DatePicker from "@/components/shared/datepicker/DatePicker";
import RadioGroupField from "@/components/shared/radio-group/radio-group";
import SelectField from "@/components/shared/select-field/select-field";
import TextareaField from "@/components/shared/textarea-field/textarea-field";
import ImageDropzone from "@/components/shared/dropzone/dropzone";

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

  const moderators = [
    { label: "John Doe", value: "John Doe" },
    { label: "John Smith", value: "John Smith" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-medium text-gray-700 mb-6">Quiz Details</h3>

      <div className="mb-6">
        <ImageDropzone
          value={form.watch()?.image}
          onChange={(file: File | null) => setValue("image", file)}
        />
        {/* <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
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
        </div> */}
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
          value={form.watch()?.date}
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

      <div className="my-6">
        <RadioGroupField
          id="joinType"
          label=""
          value={form.watch()?.joinType}
          onChange={(val) => form.setValue("joinType", val)}
          options={[
            { label: "Unlimited Join", value: "unlimited" },
            { label: "Restrict Join", value: "restricted" },
          ]}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <InputField
            label="Max Users"
            id="maxUsers"
            name="maxUsers"
            register={register}
            placeholder="Enter Max Users"
            error={errors?.maxUsers?.message}
          />
        </div>

        <div>
          <InputField
            label="Quiz Price"
            id="quizPrice"
            name="quizPrice"
            register={register}
            placeholder="Enter Max Users"
            error={errors?.quizPrice?.message}
          />
        </div>

        <div>
          <InputField
            label="Q. Countdown"
            id="questionCountdown"
            name="questionCountdown"
            register={register}
            placeholder="Enter Max Users"
            error={errors?.questionCountdown?.message}
          />
        </div>
      </div>

      <div className="mb-4">
        <SelectField
          label="Assign Moderator"
          placeholder="Select Moderator"
          value={form.watch()?.moderator}
          onChange={(val) => form.setValue("moderator", val)}
          options={moderators}
          error={errors.moderator?.message as string}
          // className=""
        />
      </div>

      <div>
        <TextareaField
          id="description"
          label="Description"
          placeholder="Enter description"
          register={register}
          error={errors.description?.message}
        />
      </div>
    </div>
  );
}
