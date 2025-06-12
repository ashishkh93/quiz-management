"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, Eye, MousePointer, UserX, User } from "lucide-react";
import { getQuizDetail, showQuestion } from "@/api-service/quiz.service";
import LockRoomModal from "../lock-room-modal";
import { toast } from "sonner";
import { getSocket } from "@/lib/socket";
import useQuizSocket from "@/hooks/useQuizSocket";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";

export default function QuizDetail({ id }: { id: string }) {
  const socket = getSocket();
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [lockRoomModalOpen, setLockRoomModalOpen] = useState(false);
  const [quizData, setQuizData] = useState<any>({});
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [joinPlayers, setJoinPlayers] = useState<number>(0);
  const [activePlayers, setActivePlayers] = useState<number>(0);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<number>(0);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  const router = useRouter();

  useQuizSocket(
    id,
    setQuizData,
    setTotalQuestions,
    setJoinPlayers,
    setActivePlayers,
    setEliminatedPlayers,
    setTopUsers
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Quiz Details</h1>
          <div className="flex gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6 cursor-pointer"
              onClick={() =>
                router.push(paths.quiz_management.add_question(id))
              }
            >
              Add Question
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              onClick={() => setLockRoomModalOpen(true)}
            >
              Lock Room
            </Button>
          </div>
        </div>

        {/* Quiz Overview - Full Width */}
        <Card className="bg-white shadow-sm mb-6 w-full">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Quiz Overview
              </h2>
              {/* <span className="text-sm text-gray-600">Jenny Alexander</span> */}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-6 text-sm mb-4">
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
                <p className="text-gray-600 text-sm mb-1">Top 5 Players:</p>
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
            {quizData?.questions?.length > 0 &&
              quizData.questions.map((question: any, index: number) => {
                return (
                  <Card
                    key={question?._id}
                    className="bg-white shadow-sm relative"
                    onMouseEnter={() => setHoveredQuestion(question.id)}
                    onMouseLeave={() => setHoveredQuestion(null)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-4">
                          {question.question}
                        </h3>
                      </div>

                      {/* Answer Options */}
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {question.options.map((option: string) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleAnswerSelect(question.id, option)
                            }
                            className={`p-3 text-left border rounded-lg transition-colors ${
                              selectedAnswers[question.id] === option
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      {/* Statistics and Timer */}
                      <div className="flex justify-between items-center">
                        <div className="grid grid-cols-4 gap-8 text-center">
                          <div>
                            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                              <User className="w-4 h-4" />
                              <span className="text-xs">User Live</span>
                            </div>
                            <p className="text-lg font-semibold">00</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                              <UserX className="w-4 h-4" />
                              <span className="text-xs">Eliminated User</span>
                            </div>
                            <p className="text-lg font-semibold">00</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                              <Eye className="w-4 h-4" />
                              <span className="text-xs">Viewers</span>
                            </div>
                            <p className="text-lg font-semibold">00</p>
                          </div>
                          <div>
                            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                              <MousePointer className="w-4 h-4" />
                              <span className="text-xs">User Clicks</span>
                            </div>
                            <p className="text-lg font-semibold">00</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {question.timer} Seconds
                            </span>
                          </div>
                          <Button
                            className="bg-green-600 hover:bg-green-700 text-white px-6"
                            onClick={() => {
                              onShowQuestionClick(question._id);
                            }}
                          >
                            Show Question
                          </Button>
                        </div>
                      </div>

                      {/* Tooltip */}
                      {/* {hoveredQuestion === question.id && (
                      <div className="absolute top-4 right-4 bg-black text-white text-xs rounded px-2 py-1 z-10">
                        Question {question.id} details
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                      </div>
                    )} */}
                    </CardContent>
                  </Card>
                );
              })}
          </div>

          {/* Announcement Section - 30% (Sticky) */}
          <div className="w-full lg:w-[30%]">
            <div className="sticky top-6">
              <Card className="bg-white shadow-sm">
                <CardHeader className="">
                  <div className="flex items-center gap-4 pb-3 overflow-x-auto">
                    {/* Question Number Indicators */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
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
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">
                      Announcement
                    </h3>
                  </div>
                  <p>
                    <strong className="text-gray-900">
                      Quiz Time! Test Your Knowledge and Win Prizes!
                    </strong>
                  </p>
                  <p>
                    Join our exciting community quiz and challenge your brain!
                    Answer fun and engaging questions across topics like general
                    knowledge, current events, and local trivia. Top scorers
                    will win awesome rewards and earn bragging rights in the
                    community.
                  </p>
                  <p>
                    <strong className="text-gray-900">
                      Quiz Time! Test Your Knowledge and Win Prizes!
                    </strong>
                  </p>
                  <p>
                    Join our exciting community quiz and challenge your brain!
                    Answer fun and engaging questions across topics like general
                    knowledge, current events, and local trivia. Top scorers
                    will win awesome rewards and earn bragging rights in the
                    community.
                  </p>
                  <p>
                    <strong className="text-gray-900">Important Rules:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Each question has a time limit</li>
                    <li>Points are awarded based on speed and accuracy</li>
                    <li>No cheating or external help allowed</li>
                    <li>Winners will be announced at the end</li>
                  </ul>
                  <p>
                    <strong className="text-gray-900">Prizes Include:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>1st Place: RM 500 + Trophy</li>
                    <li>2nd Place: RM 300 + Certificate</li>
                    <li>3rd Place: RM 200 + Certificate</li>
                    <li>Participation certificates for all</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <LockRoomModal
        open={lockRoomModalOpen}
        onOpenChange={setLockRoomModalOpen}
        id={id}
      />
    </div>
  );
}
