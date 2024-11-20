import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

export interface FilePickerProps {
  onFilesChange: (files: File[]) => void;
}

export const FilePicker = ({ onFilesChange }: FilePickerProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      setFiles(files);
      onFilesChange(files);
    },
    [onFilesChange]
  );

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <div className="grid grid-cols-6 gap-2">
        {files.map((file) => (
          <Image
            key={file.name}
            src={URL.createObjectURL(file)}
            alt={`file-preview-${file.name}`}
            className="w-full h-auto rounded-xl"
            width={100}
            height={100}
          />
        ))}
      </div>
      <Button className="flex flex-grow" onClick={() => ref.current?.click()}>
        Select Files
      </Button>
      <input
        ref={ref}
        type="file"
        multiple
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
