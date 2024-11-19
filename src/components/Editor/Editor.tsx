"use client";

import { LayerModel } from "@/models/layer";
import { Canvas } from "./Canvas";
import { LayerPanel } from "./LayerPanel";
import { useMemo, useState } from "react";
import { useTexturesFromFiles } from "@/hooks/useTexturesFromFiles";

export const Editor = () => {
  const [textureFiles, setTextureFiles] = useState<File[]>([]);

  const textures = useTexturesFromFiles(textureFiles);

  const layers = useMemo(
    () =>
      [
        {
          id: "AD6F3F5A-0E0B-4B6D-9A1D-1B1E4F2E3C5D",
          type: "IMAGE_SEQUENCE",
          name: "Layer 1",
          enabled: true,
          opacity: 100,
          src: "https://www.w3schools.com/howto/img_forest.jpg",
        },
        {
          id: "AD6F3F5A-0E0B-4B6D-9A1D-1B1E4F2E3C5B",
          type: "IMAGE_SEQUENCE",
          name: "Layer 2",
          enabled: true,
          opacity: 100,
          src: "https://www.w3schools.com/howto/img_forest.jpg",
        },
      ].map((layer) => LayerModel.parse(layer)),
    [],
  );

  return (
    <div className="flex flex-row items-stretch h-full w-full font-mono p-4">
      <div className="flex flex-row flex-grow items-center justify-center">
        <Canvas
          className="max-w-2xl flex aspect-square border border-neutral-800 w-full bg-neutral-900 rounded-4xl"
          textures={textures}
        />
      </div>
      <div className="flex flex-col p-8 bg-neutral-900 rounded-4xl">
        <LayerPanel layers={layers} onFilesChange={setTextureFiles} />
      </div>
    </div>
  );
};
