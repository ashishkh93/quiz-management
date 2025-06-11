// ----------------------------------------------------------------------

import QuizDetail from "@/components/quiz/detail/detail-quiz";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Quiz Detail| Dashboard - ${CONFIG.appName}` };
interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  return <QuizDetail id={id} />;
}
