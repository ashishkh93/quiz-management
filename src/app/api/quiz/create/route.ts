import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const POST = authorizeAction(async (_req, context) => {
  const { form } = context;

  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (key === "questions") {
      // Send entire questions array as JSON
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value)); // optional: depends on backend
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value)); // e.g., nested objects
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const result = await apiCall({
    url: endpoints.quiz.create,
    method: "post",
    data: formData,
  });

  return Response.json(result, { status: result.statusCode });
});
