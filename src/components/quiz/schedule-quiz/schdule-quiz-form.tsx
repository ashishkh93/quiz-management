"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Minus } from "lucide-react";
import { announcementSchema } from "@/utils/schema/schedule.schema";
import InputField from "@/components/shared/input/InputField";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { addAnnouncementForQuiz } from "@/api-service/quiz.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { useBoolean } from "@/hooks/useBoolean";

const ScheduleQuizForm: React.FC<CommonQuizProps> = ({ quizId }) => {
  const router = useRouter();
  const loading = useBoolean()

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<QuizScheduleFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      announcements: [{ title: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "announcements",
  });

  const onSubmit = async (data: QuizScheduleFormValues) => {
    loading.onTrue()
    const payload = {
      quizId,
      announcement: data?.announcements,
    };
    const quizRes = (await addAnnouncementForQuiz(payload)) as IDefaultResponse;

    if (!quizRes.status) {
      toast.error(quizRes?.message ?? "Quiz created successfully!");
    } else {
      router.push(paths.quiz_management.root);
      reset();
    }
    loading.onFalse()
  };

  return (
    <div className="bg-gray-50 py-4">
      <div className="max-w-8xl mx-auto px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="">
              <div className="inline-flex items-center h-[38px] rounded-tr-[16px] rounded-br-[16px] overflow-hidden mt-6">
                {/* Left vertical black bar */}
                <div className="w-[3px] h-full bg-black" />

                {/* Gradient label background */}
                <div className="bg-[linear-gradient(to_left,_rgba(60,155,54,0)_0%,_rgba(60,155,54,1)_400%)] px-6 flex items-center h-full">
                  <h1 className="text-[18px] font-medium text-black">
                    Announcement
                  </h1>
                </div>
              </div>

              <div className="space-y-4 px-6 py-4">
                {fields.map((_field, index) => (
                  <div key={index} className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-6 bg-[#7877770f] p-5 rounded-[10px]">
                        <div>
                          <InputField<QuizScheduleFormValues>
                            className="!bg-white"
                            label="Title"
                            id={`announcements.${index}.title`}
                            register={register}
                            placeholder="Enter title here"
                            error={
                              errors?.announcements?.[index]?.title?.message
                            }
                          />
                        </div>

                        <div>
                          <InputField<QuizScheduleFormValues>
                            className="!bg-white"
                            label="Description"
                            id={`announcements.${index}.description`}
                            register={register}
                            placeholder="Enter description here"
                            error={
                              errors?.announcements?.[index]?.description
                                ?.message
                            }
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex-shrink-0">
                        {index < fields.length - 1 ? (
                          <button
                            type="button"
                            className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-sm flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            onClick={() => remove(index)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-black rounded-sm flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            onClick={() =>
                              append({ title: "", description: "" })
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-start space-x-4">
              <button
                type="button"
                className="h-10 w-full sm:w-[200px] px-4 !py-[2px] border border-[#283891] rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm cursor-pointer"
              >
                Skip
              </button>
              <GradientButton
                fromGradient="from-[#0E76BC]"
                toGradient="to-[#283891]"
                className="w-[200px]"
                type="submit"
                loading={loading.bool}
              >
                Scheduler Quiz
              </GradientButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleQuizForm;
