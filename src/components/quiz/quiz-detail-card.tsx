"use client";

import { paths } from "@/routes/path";
import { Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const QuizDetailCard = ({ data }: any) => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-[1.01]"
      onClick={() =>
        router.push(`${paths.quiz_management.view}/6845408f5234c131a11745ba`)
      }
    >
      {/* Banner Section */}
      <div className="w-full h-40 relative">
        <div className="relative h-40 overflow-hidden rounded-t-xl">
          <div className="-mt-6 -mb-6 h-[calc(100%+3rem)] w-full">
            <img
              src={
                data?.image
                  ? process.env.NEXT_PUBLIC_SERVER_URL_IMAGE + data.image
                  : "/images/quiz-bg.png"
              }
              alt="Quiz Banner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Top Left Badge */}
        <div className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center z-10">
          <span className="mr-1">👥</span> {data.joiningPlayer} Joining
        </div>

        {/* Top Right Icon */}
        <div className="absolute top-3 right-3 bg-white text-gray-700 text-xs font-semibold p-2 rounded-full flex items-center z-10">
          <Share2 className="h-3 w-3 text-gray-600" />
        </div>

        {/* Centered Logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img src="/images/logo.png" className="w-44" alt="Logo" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold text-gray-800">
            {data.title}
          </div>
          <button className="text-gray-500 hover:text-gray-700">🔗</button>
        </div>
        <p className="text-sm text-gray-600 mt-1">{data.date}</p>
      </div>
    </div>
  );
};

export default QuizDetailCard;
