"use client";

import { Layer } from "@/models/layer";
import { DndContext } from "@dnd-kit/core";

import { LayerItem } from "./LayerItem";
import { useCallback } from "react";
import { Well } from "../Well/Well";
import { useQueryState } from "nuqs";
import { FilePicker } from "../FilePicker/FilePicker";
import { Composition } from "@/models/composition";
import { useComposition } from "@/providers/CompositionProvider";

export interface LayerPanelProps {
  composition: Composition;
  onFilesChange: (files: File[]) => void;
}

export const LayerPanel = ({ composition, onFilesChange }: LayerPanelProps) => {
  const [activeLayerId, setActiveLayerId] = useQueryState("activeLayerId");

  const createSelectLayerHandler = useCallback(
    (layer: Layer) => () => {
      setActiveLayerId(layer.id);
    },
    [setActiveLayerId]
  );

  const { setFPS } = useComposition();

  return (
    <div className="flex flex-col gap-y-6 w-96">
      <h3>Hierarchy</h3>
      <div className="flex items-center flex-row">
        <FilePicker onFilesChange={onFilesChange} />
      </div>
      <DndContext>
        <Well className="flex gap-y-2 flex-col-reverse">
          {composition.layers.map((layer) => (
            <LayerItem
              key={layer.id}
              layer={layer}
              selected={layer.id === activeLayerId}
              onToggle={(toggled) => {
                // Handle
              }}
              onClick={createSelectLayerHandler(layer)}
            />
          ))}
        </Well>
      </DndContext>
      <input
        type="number"
        value={composition.timeline.fps}
        onChange={(e) => setFPS(parseInt(e.target.value))}
      />
    </div>
  );
};
