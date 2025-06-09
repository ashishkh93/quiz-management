// ----------------------------------------------------------------------

import ViewQuiz from "@/components/quiz/view/view-quiz";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Quiz Detail| Dashboard - ${CONFIG.appName}` };
interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  return <ViewQuiz id={id} />;
}
