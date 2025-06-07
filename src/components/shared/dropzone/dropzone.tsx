"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  value,
  onChange,
  label,
  error,
}) => {
  const [preview, setPreview] = useState<string | null>(
    value ? URL.createObjectURL(value) : null
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange?.(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreview(null);
    onChange?.(null);
  };

  return (
    <div className="mb-6">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div
        {...getRootProps()}
        className={`w-full h-40 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive
            ? "bg-blue-50 border-blue-300"
            : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={preview}
              alt="Uploaded"
              fill
              className="object-contain rounded-md"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow cursor-pointer"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ) : (
          <>
            <div className="rounded-full bg-gray-100 p-2 mb-2">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              Upload or Drag & Drop an image
            </p>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default ImageDropzone;
