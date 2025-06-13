import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const GET = authorizeAction(async (_req, context) => {
  const params = await context;

  const result = await apiCall({
    url: `${endpoints.quiz.detail}/${params?.id}`,
    method: "get",
  });

  return Response.json(result, { status: result.statusCode });
});
