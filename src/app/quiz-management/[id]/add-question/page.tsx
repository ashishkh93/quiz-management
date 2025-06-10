// ----------------------------------------------------------------------

import AddQuizQuestion from "@/components/quiz/create-quiz/add-quiz-question";
import { CONFIG } from "@/global-config";

export const metadata = {
  title: `Edit Quiz | Dashboard - ${CONFIG.appName}`,
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const quizParams = await params;

  return <AddQuizQuestion quizId={quizParams.id} />;
}
