interface ImageDropzoneProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  label?: string;
  error?: string;
}
