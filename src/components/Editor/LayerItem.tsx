import { Switch } from "@/components/Switch/Switch";
import { Layer, LayerType } from "@/models/layer";
import { twMerge } from "@/utils/twMerge";
import { MouseEventHandler, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export interface LayerItemProps {
  layer: Layer;
  selected: boolean;
  onToggle: (enabled: boolean) => void;
  onClick: MouseEventHandler;
}

export const LayerItem = ({
  layer,
  selected,
  onToggle,
  onClick,
}: LayerItemProps) => {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable(
    {
      id: layer.id,
    },
  );

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const wrapperClassNames = twMerge(
    "flex items-center text-sm group justify-between px-5 py-4 rounded-2xl last:mb-0 transition-colors transitions-shadow duration-100",
    {
      "bg-black bg-neutral-900": selected,
      "hover:bg-neutral-900": !selected,
      "shadow-xl": selected,
    },
  );

  const titleClassNames = twMerge("font-medium line-clamp-1", {
    "text-slate-300": selected,
  });

  return (
    <div
      ref={setNodeRef}
      className={wrapperClassNames}
      onClick={onClick}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex flex-col gap-y-1">
        <h3 className={titleClassNames}>{layer.name}</h3>
        <span className="text-neutral-500 text-xs capitalize">
          {getLayerTypeLabel(layer.type)}
        </span>
      </div>
      <Switch
        className={twMerge("hidden group-hover:flex", { flex: active })}
        active={layer.enabled}
        onToggle={onToggle}
      />
    </div>
  );
};

const getLayerTypeLabel = (type: LayerType) => {
  switch (type) {
    case "IMAGE_SEQUENCE":
      return "Image Sequence";
    case "ADJUSTMENT":
      return "Adjustment";
    default:
      return "Unknown";
  }
};
