import React, { Fragment } from "react";
import { Search, Share2 } from "lucide-react";
import QuizDetailCard from "./quiz-detail-card";
import Typography from "../ui/typegraphy";
import InputField from "../shared/input/InputField";
import { Button } from "../ui/button";
import GradientButton from "../molecules/gradient-button/gradient-button";

const QuizComponent = () => {
  return (
    <div className="flex flex-col flex-[0_0_auto] space-y-4 my-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start">
          Upcoming Quiz
        </Typography>
        <div className="flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <InputField
            name="search"
            className="rounded-md h-10"
            icon={Search}
            iconClassName="!w-4 !h-4"
            placeholder="Search"
          />
          <GradientButton>View Moderator</GradientButton>
          <GradientButton
            fromGradient="from-[#0E76BC]"
            toGradient="to-[#283891]"
          >
            Create Quiz
          </GradientButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <Fragment key={i}>
            <QuizDetailCard />
          </Fragment>
        ))}
      </div>
      <div className="space-y-4">
        <Typography size="lg" className="text-start">
          Quiz History
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Fragment key={i}>
              <QuizDetailCard />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
