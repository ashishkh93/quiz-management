"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LockRoomModal from "../lock-room-modal";
import { getSocket } from "@/lib/socket";
import useQuizSocket from "@/hooks/useQuizSocket";
import QuestionCard from "../create-quiz/QuestionCard";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import WinnerPopup from "../create-quiz/winner-popup";
import GradientTitle from "@/components/shared/gradient/gradient-title";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import Link from "next/link";

export default function QuizDetail({ id }: { id: string }) {
  const socket = getSocket();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [lockRoomModalOpen, setLockRoomModalOpen] = useState(false);
  const [quizData, setQuizData] = useState<any>({});
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [joinPlayers, setJoinPlayers] = useState<number>(0);
  const [activePlayers, setActivePlayers] = useState<number>(0);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<number>(0);
  const [winnerList, setWinnerList] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [lstQuestion, setLstQuestion] = useState<any[]>([]);

  const router = useRouter();

  useQuizSocket(
    id,
    setQuizData,
    setTotalQuestions,
    setJoinPlayers,
    setActivePlayers,
    setEliminatedPlayers,
    setTopUsers,
    setLstQuestion,
    setWinnerList
  );

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const onShowQuestionClick = async (questionId: string) => {
    socket.emit("show_question", {
      quizId: id,
      questionId: questionId,
      // questionCountdown: quizData?.questionCountdown,
    });
    // const moderatorRes = (await showQuestion({
    //   quizId: id,
    //   questionId: questionId,
    // })) as IDefaultResponse;
    // console.log("moderatorRes: ", moderatorRes);
    // if (!moderatorRes.status) {
    //   toast.error(moderatorRes?.message ?? "Moderator created successfully!");
    // } else {
    //   toast.success(moderatorRes?.message ?? "Moderator created successfully!");
    // }
  };

  const onShowAnswerClick = (questionId: string) => {
    socket.emit("show_answer", {
      quizId: id,
      questionId: questionId,
    });

    console.log("onShowAnswerClick: ", id);
  };

  const onCompleteQuiz = () => {
    socket.emit("complete_quiz", {
      quizId: id,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-gray-900">Quiz Details</h1>
          <div className="flex gap-3">
            <Link href={paths.quiz_management.add_question(id)}>
              <GradientButton
                fromGradient="from-[#71D561]"
                toGradient="to-[#00A32E]"
                className="text-white px-6 cursor-pointer"
                onClick={() =>
                  router.push(paths.quiz_management.add_question(id))
                }
              >
                Add Question
              </GradientButton>
            </Link>
            <GradientButton
              className="text-white px-6"
              onClick={() => setLockRoomModalOpen(true)}
            >
              Lock Room
            </GradientButton>
          </div>
        </div>

        {/* Quiz Overview - Full Width */}
        <Card className="bg-white shadow-sm mb-6 w-full">
          <div className="flex justify-between items-center mx-2">
            <div className="relative w-full bg-[#f1f6fa] rounded-[5px]">
              <img
                src={"/images/QuizOverviewStrip.svg"}
                alt={"QuizOverviewStrip"}
                className="h-5 absolute left-0 top-1.5"
              />
              {/* QuizOverviewStrip */}
              <div className="text-md font-semibold text-gray-900 p-1 ml-3">
                Quiz Overview
              </div>
            </div>
          </div>
          {/* <CardHeader className="">
          </CardHeader> */}
          <CardContent>
            <div className="grid grid-cols-7 gap-3 text-xs mb-4">
              <div>
                <p className="text-gray-600 mb-1">Quiz Title:</p>
                <p className="font-medium">{quizData?.title}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Prize Pool:</p>
                <p className="font-medium">{quizData?.quizPrice}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Questions:</p>
                <p className="font-medium">{totalQuestions}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Joining Players:</p>
                <p className="font-medium">{joinPlayers}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Active Players:</p>
                <p className="font-medium">{activePlayers}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Eliminated Players:</p>
                <p className="font-medium">{eliminatedPlayers}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Top 5 Players:</p>
                <div className="flex -space-x-2">
                  {topUsers.length
                    ? topUsers.map((player) => (
                        <img
                          key={player.userId}
                          src={player.pic || "/images/user.jpg"}
                          alt={player.username}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))
                    : "-"}
                </div>
              </div>
            </div>
            {/* <div className="flex justify-between items-center">

                            <div className="text-right">
                                <span className="text-gray-600 text-sm">Point: </span>
                                <span className="font-semibold">18</span>
                            </div>
                        </div> */}
          </CardContent>
        </Card>

        {/* Content Area - 70% Questions + 30% Announcement */}
        <div className="flex gap-6">
          {/* Questions Section - 70% */}
          <div className="w-full lg:w-[70%] space-y-4">
            {lstQuestion?.length > 0 &&
              lstQuestion.map((question: any, index: number) => {
                return (
                  <QuestionCard
                    key={index}
                    question={question}
                    selectedAnswers={selectedAnswers}
                    onAnswerSelect={handleAnswerSelect}
                    onShowQuestionClick={onShowQuestionClick}
                    onShowAnswerClick={onShowAnswerClick}
                  />
                );
              })}
          </div>

          {/* Announcement Section - 30% (Sticky) */}
          <div className="w-full lg:w-[30%]">
            <div className="sticky top-6">
              <Card className="bg-white shadow-sm">
                {/* <CardHeader className=""> */}
                <div className="flex items-center gap-4 overflow-x-auto p-3">
                  {/* Question Number Indicators */}
                  <div className="flex gap-1">
                    {Array.from(
                      { length: lstQuestion?.length || 0 },
                      (_, index) => {
                        const num = index + 1;
                        return (
                          <div
                            key={num}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                              num === 5
                                ? "bg-green-500 text-white"
                                : num < 5
                                ? "bg-gray-300 text-gray-700"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {num}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                {/* </CardHeader> */}
                <div className="text-sm text-gray-600 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <GradientTitle title="Announcement" parentClass="!mt-0" />
                  </div>
                  <div className="px-3 py-1">
                    {quizData?.AnnouncementQuiz?.length > 0
                      ? quizData?.AnnouncementQuiz.map(
                          (obj: any, idx: number) => {
                            return (
                              <div
                                key={idx}
                                className="bg-[#f5f5f5] p-3 mb-3 rounded-lg"
                              >
                                <p>
                                  <strong className="text-gray-900 text-sm">
                                    {obj?.title}
                                  </strong>
                                </p>
                                <p className="text-xs mt-1">
                                  {obj?.description}
                                </p>
                              </div>
                            );
                          }
                        )
                      : "Not found"}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <WinnerPopup winnerList={winnerList}>
          <GradientButton
            className="text-white px-6 mt-5"
            onClick={() => onCompleteQuiz()}
          >
            Complete quiz
          </GradientButton>
        </WinnerPopup>
      </div>
      <LockRoomModal
        open={lockRoomModalOpen}
        onOpenChange={setLockRoomModalOpen}
        id={id}
      />
    </div>
  );
}
