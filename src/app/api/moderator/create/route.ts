// src/app/api/moderator/create/route.ts

import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const POST = authorizeAction(async (_req: any, _context: any) => {
  const body = _req.body;

  const result = await apiCall({
    url: endpoints.moderator.create,
    method: "post",
    data: body,
  });

  return Response.json(result, { status: result.statusCode });
});
