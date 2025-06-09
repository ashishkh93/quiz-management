import { NextRequest } from "next/server";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";
import { endpoints } from "@/utils/server/axios";

export const GET = authorizeAction(async (req: NextRequest) => {
  const search = req.nextUrl.searchParams.get("search") || "";
  const result = await apiCall({
    url: `${endpoints.moderator.list}?search=${search}`,
    method: "get",
  });

  return Response.json(result, { status: result.statusCode });
});
