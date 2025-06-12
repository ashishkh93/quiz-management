"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, UserX, Eye, MousePointer } from "lucide-react";
import QuestionActionButton from "./QuestionActionButton";

interface QuestionCardProps {
  question: any;
  selectedAnswers: Record<string, string>;
  onAnswerSelect: (questionId: number, answer: string) => void;
  onShowQuestionClick: (questionId: string) => void;
  onShowAnswerClick: (questionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswers,
  onAnswerSelect,
  onShowQuestionClick,
  onShowAnswerClick,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <Card
      key={question?._id}
      className="bg-white shadow-sm relative"
      onMouseEnter={() => setHovered(question.id)}
      onMouseLeave={() => setHovered(null)}
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
              onClick={() => onAnswerSelect(question.id, option)}
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
            {/* <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {question.timer} Seconds
              </span>
            </div> */}

            <QuestionActionButton
              question={question}
              showDate={question.showDate}
              questionId={question._id}
              onShowQuestionClick={onShowQuestionClick}
              onShowAnswerClick={onShowAnswerClick}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
