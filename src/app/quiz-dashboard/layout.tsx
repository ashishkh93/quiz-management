import { AuthGuard } from "@/auth/context/guard/auth-guard";
import QuizLayout from "@/components/layout/quiz-layout";
import { CONFIG } from "@/global-config";
import React from "react";

export default function Layout({ children }: IChildren) {
  const skipAuth = CONFIG.skip_auth;

  if (skipAuth) {
    return <QuizLayout>{children}</QuizLayout>;
  }

  return (
    <AuthGuard>
      <QuizLayout>{children}</QuizLayout>
    </AuthGuard>
  );
}
