"use client";

import { Layer, TextLayer, TextLayerModel } from "@/models/layer";
import { DndContext } from "@dnd-kit/core";

import { LayerItem } from "./LayerItem";
import { useCallback } from "react";
import { Well } from "../Well/Well";
import { useQueryState } from "nuqs";
import { FilePicker } from "../FilePicker/FilePicker";
import { useComposition } from "@/providers/CompositionProvider";
import { TimelineModel } from "@/models/timeline";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";

export interface LayerPanelProps {
  onFilesChange: (files: File[]) => void;
}

export const LayerPanel = ({ onFilesChange }: LayerPanelProps) => {
  return (
    <div className="flex flex-col gap-y-16 w-96 h-full justify-between">
      <div className="flex flex-col gap-y-12">
        <FilePicker onFilesChange={onFilesChange} />
        <TextInput />
        <FPSPicker />
      </div>
      <LayerHierarchy />
    </div>
  );
};

const LayerHierarchy = () => {
  const [activeLayerId, setActiveLayerId] = useQueryState("activeLayerId");
  const { composition } = useComposition();

  const createSelectLayerHandler = useCallback(
    (layer: Layer) => () => {
      setActiveLayerId(layer.id);
    },
    [setActiveLayerId]
  );

  return (
    <DndContext>
      <div className="flex flex-col gap-y-6 h-full">
        <h3 className="text-sm">Hierarchy</h3>
        <Well className="flex gap-y-2 flex-col-reverse flex-grow h-full justify-end">
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
      </div>
    </DndContext>
  );
};

const TextInput = () => {
  const { composition, setComposition } = useComposition();

  const textLayer = composition.layers.find(
    (layer) => layer.type === "TEXT"
  ) as TextLayer | undefined;

  return (
    <Input
      placeholder="Text"
      value={textLayer?.text}
      onChange={(e) =>
        setComposition({
          ...composition,
          layers: [
            ...composition.layers.filter((layer) => layer.type !== "TEXT"),
            TextLayerModel.parse({
              ...textLayer,
              text: e.target.value,
            }),
          ],
        })
      }
    />
  );
};

const FPSPicker = () => {
  const { composition, setComposition } = useComposition();

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const startX = event.clientX;
      let isDragging = true;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = moveEvent.clientX - startX;
        const newFps = Math.min(
          24,
          Math.max(1, composition.timeline.fps + Math.round(deltaX / 10))
        );

        // Ensure FPS is between 1 and 24
        const clampedFps = Math.max(1, Math.min(24, newFps));

        setComposition((prevComposition) => ({
          ...prevComposition,
          timeline: {
            ...prevComposition.timeline,
            fps: clampedFps,
          },
        }));
      };

      const handleMouseUp = () => {
        isDragging = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [composition.timeline.fps, setComposition]
  );

  return (
    <div
      className="flex flex-col gap-y-4 cursor-ew-resize user-select-none"
      onMouseDown={handleMouseDown}
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-sm">Framerate</h3>
        <span className="text-xs text-neutral-500">
          {composition.timeline.fps} FPS
        </span>
      </div>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row justify-between text-xs">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="flex flex-row items-center gap-x-1">
              <div
                className={`w-[1px] h-3 ${
                  index < composition.timeline.fps
                    ? "bg-white"
                    : "bg-neutral-600"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
