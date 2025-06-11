import React from "react";
import ScheduleQuizForm from "./schdule-quiz-form";

const ScheduleQuiz: React.FC<CommonQuizProps> = ({ quizId }) => {
  return (
    <div className="h-full">
      <div className="mx-4 font-bold text-xl">Schedule Quiz</div>
      <ScheduleQuizForm quizId={quizId} />
    </div>
  );
};

export default ScheduleQuiz;
