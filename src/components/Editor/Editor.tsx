"use client";

import { Canvas } from "./Canvas";
import { LayerPanel } from "./LayerPanel";
import { useState } from "react";
import { useTexturesFromFiles } from "@/hooks/useTexturesFromFiles";
import { CompositionModel } from "@/models/composition";
import { CompositionProvider } from "@/providers/CompositionProvider";

export const Editor = () => {
  const [textureFiles, setTextureFiles] = useState<File[]>([]);

  const textures = useTexturesFromFiles(textureFiles);

  const composition = CompositionModel.parse({
    timeline: {
      fps: 4,
    },
    layers: [
      {
        id: "AD6F3F5A-0E0B-4B6D-9A1D-1B1E4F2E3C5D",
        type: "IMAGE_SEQUENCE",
        name: "Layer 1",
        enabled: true,
        opacity: 100,
        textures: textures,
      },
      {
        id: "AD6F3F5A-0E0B-4B6D-9A1D-1B1E4F2E3C5B",
        type: "ADJUSTMENT",
        name: "Layer 2",
        enabled: true,
        opacity: 100,
      },
    ],
  });

  return (
    <CompositionProvider value={composition}>
      <div className="flex flex-row items-stretch h-full w-full font-mono p-4">
        <div className="flex flex-row flex-grow items-center justify-center">
          <Canvas
            gl={{ antialias: true }}
            className="w-96 h-96 flex-grow-0 flex-shrink-0 flex bg-neutral-900"
            composition={composition}
          />
        </div>
        <div className="flex flex-col p-8 bg-neutral-900 rounded-4xl">
          <LayerPanel
            composition={composition}
            onFilesChange={setTextureFiles}
          />
        </div>
      </div>
    </CompositionProvider>
  );
};
