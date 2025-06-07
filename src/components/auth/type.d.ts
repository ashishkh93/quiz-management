import { z } from "zod";

declare global {
  type LoginFormData = z.infer<typeof loginSchema>;
}
