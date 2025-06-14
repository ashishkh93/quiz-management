"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
interface WinnerPopupProps {
  children?: ReactNode;
  winnerList: any[];
}

export default function WinnerPopup({
  children,
  winnerList,
}: WinnerPopupProps) {
  console.log("winnerList: ", winnerList);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (winnerList?.length) setIsOpen(true);
  }, [winnerList]);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children && children}</div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            router.push(paths.quiz_management.root);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[600px] p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                {"Quiz Winners"}
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="px-6 py-4">
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-1">
                {winnerList.length > 0 &&
                  winnerList?.map((user: any) => (
                    <div
                      key={user?._id}
                      className="flex items-center justify-around py-3 px-2 hover:bg-gray-50 rounded-md"
                    >
                      <div className="flex justify-between flex-1">
                        {/* pic */}
                        <div className="flex items-center">
                          <img
                            key={user.userId}
                            src={user.pic || "/images/user.jpg"}
                            alt={user.username}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                          <div className="font-medium text-gray-900 ml-2">
                            {user.username}
                          </div>
                          <div className="ml-2">
                            Price Amt: {user.quizPrice}
                          </div>
                        </div>
                      </div>
                      <div>{user.scored}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
