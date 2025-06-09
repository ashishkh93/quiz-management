// ----------------------------------------------------------------------

import ViewQuiz from "@/components/quiz/detail/view-quiz";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Quiz Detail| Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ViewQuiz />;
}
