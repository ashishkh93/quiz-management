import { Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { unlockRoom } from "@/api-service/quiz.service";
import { toast } from "sonner";

interface LockRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}

export default function LockRoomModal({
  open,
  onOpenChange,
  id,
}: LockRoomModalProps) {
  const handleUnlockRoom = async () => {
    try {
      const response = await unlockRoom(id);
      console.log("Room unlocked:", response);
      if (response.status) {
        onOpenChange(false);
        toast.success(
          response.data?.message ?? "Room lock/unlock successfully!"
        );
      } else {
        toast.error(response?.message ?? "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to unlock room:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          {/* Lock Icon */}
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-gray-700" />
            </div>
          </div>

          {/* Modal Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            You Want to lock room?
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Once the room is locked, no new participants will be able to join
            this quiz. Only users who have already joined will be allowed to
            continue.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 h-12 text-blue-600 border-blue-600 hover:bg-blue-50"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
              onClick={() => handleUnlockRoom()}
            >
              Lock Room
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
