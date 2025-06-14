// @ts-nocheck
"use client";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import debounce from "lodash/debounce";
import QuizDetailCard from "./quiz-detail-card";
import Typography from "../ui/typegraphy";
import GradientButton from "../molecules/gradient-button/gradient-button";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { getQuizList } from "@/api-service/quiz.service";
import { Input } from "../ui/input";
import AssignModeratorPopup from "./create-quiz/assign-moderator-popup";
import moment from "moment";
import { currentDateToUTC } from "@/lib/utils";
import { useBoolean } from "@/hooks/useBoolean";
import DashboardSkeleton from "../shared/skeleton/dashboard-skeleton";
import NoDataFound from "../shared/not-found/no-data-found";
import InputField from "../shared/input/InputField";
import { X } from "lucide-react";

const QuizComponent = () => {
  const router = useRouter();
  const [quizListData, setQuizListData] = useState<any>([]);
  const [quizHistoryData, setQuizHistoryData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadingBool = useBoolean(true);

  const onload = useCallback(async () => {
    loadingBool.onTrue();
    const quizRes = (await getQuizList({
      search: searchTerm,
      date: currentDateToUTC(),
    })) as any;

    setQuizListData(quizRes?.data?.upcoming);
    setQuizHistoryData(quizRes?.data?.history);
    loadingBool.onFalse();
  }, [searchTerm]);

  useEffect(() => {
    const handler = debounce(() => {
      onload();
    }, 300);

    handler();

    return () => handler.cancel();
  }, [searchTerm]);

  return loadingBool.bool ? (
    <DashboardSkeleton />
  ) : (
    <div className="flex flex-col flex-[0_0_auto] space-y-4 my-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start">
          Upcoming Quiz
        </Typography>
        <div className="flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <InputField
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-5"
            rightIcon={
              searchTerm ? (
                <X
                  className="w-4 h-4 text-gray-400"
                  onClick={() => setSearchTerm("")}
                />
              ) : (
                <></>
              )
            }
          />
          <AssignModeratorPopup>
            <GradientButton>View Moderator</GradientButton>
          </AssignModeratorPopup>
          <GradientButton
            fromGradient="from-[#0E76BC]"
            toGradient="to-[#283891]"
            onClick={() => router.push(paths.quiz_management.create)}
          >
            Create Quiz
          </GradientButton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mb-10">
        {quizListData?.length > 0 ? (
          quizListData.map((data: any, index: number) => (
            <Fragment key={index}>
              <QuizDetailCard data={data} />
            </Fragment>
          ))
        ) : (
          <NoDataFound description="No Upcoming quiz available." />
        )}
      </div>
      <div className="space-y-4">
        <Typography size="lg" className="text-start">
          Quiz History
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {quizHistoryData?.length > 0 ? (
            quizHistoryData.map((data: any, index: number) => (
              <Fragment key={index}>
                <QuizDetailCard data={data} />
              </Fragment>
            ))
          ) : (
            <NoDataFound description="No quiz history available." />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
