import { Input } from "../../ui/input";
import React from "react";

const InputField: React.FC<CustomInputFieldProps> = ({
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
}) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && <label className="text-sm text-[#3b3a3a]">{label}</label>}
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
          className={`h-14 pl-12 pr-12 !w-full rounded-2xl border ${
            error ? "border-red-500" : "border-[#adadad]"
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-[17px] top-1/2 -translate-y-1/2 text-[#3b3a3a] cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputField;
