"use client";

import { Layer } from "@/models/layer";
import { DndContext } from "@dnd-kit/core";

import { LayerItem } from "./LayerItem";
import { useCallback } from "react";
import { Well } from "../Well/Well";
import { useQueryState } from "nuqs";
import { FilePicker } from "../FilePicker/FilePicker";
import { useComposition } from "@/providers/CompositionProvider";
import { TimelineModel } from "@/models/timeline";
import { Slider } from "../ui/slider";

export interface LayerPanelProps {
  onFilesChange: (files: File[]) => void;
}

export const LayerPanel = ({ onFilesChange }: LayerPanelProps) => {
  const [activeLayerId, setActiveLayerId] = useQueryState("activeLayerId");

  const createSelectLayerHandler = useCallback(
    (layer: Layer) => () => {
      setActiveLayerId(layer.id);
    },
    [setActiveLayerId]
  );

  const { composition, setComposition } = useComposition();

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
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-sm">Framerate</h3>
          <span className="text-xs text-neutral-500">
            {composition.timeline.fps} FPS
          </span>
        </div>
        <div className="flex flex-col gap-y-3">
          <Slider
            value={[composition.timeline.fps]}
            max={24}
            min={0}
            onValueChange={(value) =>
              setComposition({
                ...composition,
                timeline: TimelineModel.parse({
                  ...composition.timeline,
                  fps: value[0],
                }),
              })
            }
          />
          <div className="flex flex-row justify-between text-xs px-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="flex flex-row items-center gap-x-1">
                {i % 2 === 0 ? (
                  <div
                    className={`w-[1px] h-2 ${
                      i <= composition.timeline.fps
                        ? "bg-white"
                        : "bg-neutral-600"
                    }`}
                  />
                ) : (
                  <div
                    className={`w-1 h-1 rounded-full ${
                      i <= composition.timeline.fps
                        ? "bg-white"
                        : "bg-neutral-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
