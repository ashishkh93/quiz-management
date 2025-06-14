import React from "react";

type TGradientTitleProps = {
  title: string;
  parentClass?: string;
};

const GradientTitle: React.FC<TGradientTitleProps> = ({ title = "", parentClass }) => {
  return (
    <div className={`inline-flex items-center h-[38px] rounded-tr-[16px] rounded-br-[16px] overflow-hidden mt-6 ${parentClass}`}>
      {/* Left vertical black bar */}
      <div className="w-[3px] h-full bg-black" />

      {/* Gradient label background */}
      <div className="bg-[linear-gradient(to_left,_rgba(60,155,54,0)_0%,_rgba(60,155,54,1)_400%)] px-6 flex items-center h-full">
        <h1 className="text-[18px] font-medium text-black">{title}</h1>
      </div>
    </div>
  );
};

export default GradientTitle;
