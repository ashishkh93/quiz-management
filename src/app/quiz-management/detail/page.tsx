// ----------------------------------------------------------------------

import QuizDetail from "@/components/quiz/detail/detail-quiz";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Quiz Detail| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <QuizDetail />;
}
