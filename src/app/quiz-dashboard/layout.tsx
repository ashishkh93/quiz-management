import QuizLayout from "@/components/layout/quiz-layout";
import React from "react";

const Layout = ({ children }: IChildren) => {
  return <QuizLayout>{children}</QuizLayout>;
};

export default Layout;
