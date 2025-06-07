import CustomLoader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import React from "react";

const GradientButton = ({
  children,
  className,
  title = "Button",
  fromGradient = "from-[#8ABB2A]",
  toGradient = "to-[#3C9B36]",
  disabled,
  loading,
  ...props
}: IGradientButtonProps) => {
  return (
    <Button
      className={`h-10 bg-gradient-to-r ${fromGradient} ${toGradient} text-white border-none hover:opacity-90 cursor-pointer ${className}`}
      {...props}
      disabled={disabled}
    >
      {children}
      {loading && <CustomLoader size={20} color="white" />}
    </Button>
  );
};

export default GradientButton;
