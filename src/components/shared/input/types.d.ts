import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

declare global {
  interface CustomInputFieldProps {
    name: string;
    id?: string;
    label?: string;
    className?: string;
    iconClassName?: string;
    icon?: LucideIcon;
    rightIcon?: React.ReactNode;
    placeholder?: string;
    type?: string;
    register?: UseFormRegister<any>;
    error?: FieldError;
  }
}
