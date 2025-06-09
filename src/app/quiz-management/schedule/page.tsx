import ScheduleQuiz from "@/components/quiz/schedule-quiz/schedule-quiz";
import { CONFIG } from "@/global-config";

export const metadata = {
  title: `Quiz Schedule | Dashboard - ${CONFIG.appName}`,
};

export default function Page() {
  return <ScheduleQuiz />;
}
