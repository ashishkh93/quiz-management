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

interface UrlModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export default function UrlModal({ open, onOpenChange, id }: UrlModalProps) {
  const router = useRouter();

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
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              URL
            </label>
            <Input id="url" placeholder="Add URL here..." />
          </div>
          <div className="w-full flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-1/2 bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                router.push(`${paths.quiz_management.detail}/${id}`)
              }
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
