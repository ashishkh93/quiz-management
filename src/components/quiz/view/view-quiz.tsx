"use client";

import { getQuizDetail } from "@/api-service/quiz.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import UrlModal from "../url-modal";
import { paths } from "@/routes/path";
import { useRouter } from "next/navigation";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { useBoolean } from "@/hooks/useBoolean";
import QuizSkeleton from "@/components/shared/skeleton/quiz-skeleton";

export default function ViewQuiz({ id }: { id: string }) {
  const participants = [
    { id: 1, name: "User 1", avatar: "/images/user.jpg" },
    { id: 2, name: "User 2", avatar: "/images/user.jpg" },
    { id: 3, name: "User 3", avatar: "/images/user.jpg" },
    { id: 4, name: "User 4", avatar: "/images/user.jpg" },
    { id: 5, name: "User 5", avatar: "/images/user.jpg" },
  ];
  const router = useRouter();
  const [quizData, setQuizData] = useState<any>({});
  const [urlModalOpen, setUrlModalOpen] = useState(false);

  const loadingBool = useBoolean();

  useEffect(() => {
    onload();
  }, [id]);

  const onload = async () => {
    loadingBool.onTrue();
    const quizRes = (await getQuizDetail(id)) as any;
    setQuizData(quizRes.data.data);
    loadingBool.onFalse();
  };

  return loadingBool.bool ? (
    <QuizSkeleton />
  ) : (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quiz Overview Card */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Quiz Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Quiz Title:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.title}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">
                    Description:
                  </span>
                  <span className="text-sm text-gray-900 text-right max-w-xs">
                    {quizData?.description}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Status:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.status}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Created By:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.createdBy}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Scheduled Date:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.scheduledDate}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Time:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.time}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Total Questions:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.totalQuestions}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Details Card */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Other Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Prize Pool:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.quizPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Que Countdown:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.questionCountdown}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Question Types:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.questionType}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    Notified Players:
                  </span>
                  <span className="text-sm text-gray-900">
                    {quizData?.notifiedPlayersCount}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-600">
                    Participants:
                  </span>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex -space-x-2">
                      {participants.map((participant) => (
                        <Avatar
                          key={participant.id}
                          className="w-8 h-8 border-2 border-white"
                        >
                          <AvatarImage
                            src={participant.avatar || "/placeholder.svg"}
                            alt={participant.name}
                          />
                          <AvatarFallback className="text-xs">
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-3"
                    >
                      View All Participants
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <UrlModal open={urlModalOpen} onOpenChange={setUrlModalOpen} id={id} />

        {/* Start Quiz Button */}
        <div className="mt-6">
          <GradientButton
            type="button"
            className="text-white px-6 py-2"
            onClick={() => {
              if (quizData.videoUrl) {
                router.push(`${paths.quiz_management.detail}/${id}`);
              } else {
                setUrlModalOpen(true);
              }
            }}
          >
            Start Quiz Now
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
