import { Input } from "../../ui/input";
import React from "react";

const InputField = <T extends Record<string, any>>({
  id,
  label,
  className,
  iconClassName,
  icon: Icon,
  rightIcon,
  placeholder,
  type = "text",
  register,
  error,
  ...props
}: CustomInputFieldProps<T>): React.ReactElement => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && <label className="text-[13px] text-[#3b3a3a]">{label}</label>}
      <div className="relative w-full">
        {Icon && (
          <div className="absolute left-[17px] top-1/2 -translate-y-1/2 text-[#3b3a3a]">
            <Icon className={`w-5 h-5 ${iconClassName}`} />
          </div>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          {...register?.(id)}
          className={`${
            Icon ? "pl-12 pr-12" : "pl-4 pr-4"
          } h-10 !w-full rounded-md border focus:!ring-0 placeholder:text-[13px] ${
            error ? "border-red-500" : "border-gray-200"
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-[17px] top-1/2 -translate-y-1/2 text-[#3b3a3a] cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 !text-[12px]">{error}</span>}
    </div>
  );
};

export default InputField;
