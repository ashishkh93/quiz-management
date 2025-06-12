import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const PUT = authorizeAction(async (req: Request, context) => {
  const { form, params } = context;

  const roomId = params?.id;

  if (!roomId) {
    return Response.json({ message: "Room ID is required" }, { status: 400 });
  }

  const result = await apiCall({
    url: `${endpoints.quiz.addUrl}/${roomId}`,
    method: "put",
    data: form,
  });

  return Response.json(result, { status: result.statusCode });
});
