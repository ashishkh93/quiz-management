import { UseFormRegister } from "react-hook-form";

declare global {
  interface TextareaFieldProps {
    id: string;
    label?: string;
    className?: string;
    placeholder?: string;
    register?: UseFormRegister<QuizFormValues>;
    error?: string;
    rows?: number;
    [key: string]: any; // for spreading other props
  }
}
