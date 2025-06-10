// ----------------------------------------------------------------------

import EditQuiz from "@/components/quiz/create-quiz/edit-quiz";
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

  return <EditQuiz quizId={quizParams.id} />;
}
