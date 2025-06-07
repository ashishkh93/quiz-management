"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  size?: number;
  className?: string;
  text?: string;
};

export const SplashScreen = ({
  size = 24,
  className,
  text,
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <Loader2
        className={cn("animate-spin text-muted-foreground", className)}
        size={size}
        strokeWidth={2.5}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
