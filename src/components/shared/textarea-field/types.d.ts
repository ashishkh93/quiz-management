interface TextareaFieldProps {
  id: string;
  label?: string;
  className?: string;
  placeholder?: string;
  register?: (id: string) => any;
  error?: string;
  rows?: number;
  [key: string]: any; // for spreading other props
}
