import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { paths } from "@/routes/path";
import { addUrl } from "@/api-service/quiz.service";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

interface UrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

// ✅ Zod schema
const urlSchema = z.object({
  url: z.string().url("Please enter a valid URL").min(1, "URL is required"),
});

type UrlFormData = z.infer<typeof urlSchema>;

export default function UrlModal({ open, onOpenChange, id }: UrlModalProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: UrlFormData) => {
    try {
      const response = await addUrl(id, { videoUrl: data.url }); // Pass url to backend
      console.log("Add url:", response);
      if (response.status) {
        onOpenChange(false);
        toast.success(response.data?.message ?? "URL added successfully!");
        router.push(`${paths.quiz_management.detail}/${id}`);
      } else {
        toast.error(response?.message ?? "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to add URL:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Add URL!!
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Before starting the quiz, you must add a TikTok or YouTube video
            URL. This video will be shown in the quiz preview inside the app.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              URL
            </label>
            <Input
              id="url"
              placeholder="Add URL here..."
              {...register("url")}
            />
            {errors.url && (
              <p className="text-sm text-red-500">{errors.url.message}</p>
            )}
          </div>
          <div className="w-full flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => onOpenChange(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="w-1/2 bg-blue-600 hover:bg-blue-700"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
