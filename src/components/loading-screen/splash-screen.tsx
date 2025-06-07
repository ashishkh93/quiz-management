"use client";

import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  size?: number;
  className?: string;
  text?: string;
  color?: string;
};

export const SplashScreen = ({
  size = 30,
  className,
  text,
  color = "black",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 min-h-screen">
      <Loader
        className={cn("animate-spin text-muted-foreground", className)}
        size={size}
        strokeWidth={2.5}
        color={color}
      />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
