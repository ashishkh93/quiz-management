import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const PUT = authorizeAction(async (req: Request, context) => {
  const { params } = context;
  const roomId = params?.id;

  if (!roomId) {
    return Response.json({ message: "Room ID is required" }, { status: 400 });
  }

  const result = await apiCall({
    url: `${endpoints.quiz.unlockRoom}/${roomId}`,
    method: "put",
  });

  return Response.json(result, { status: result.statusCode });
});
