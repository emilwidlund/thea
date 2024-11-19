import { forwardRef, useCallback } from "react";

export interface FilePickerProps {
  onFilesChange: (files: File[]) => void;
}

export const FilePicker = forwardRef<HTMLInputElement, FilePickerProps>(
  ({ onFilesChange }, ref) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        onFilesChange(files);
      },
      [onFilesChange],
    );

    return <input ref={ref} type="file" multiple onChange={handleChange} />;
  },
);
