import { Switch } from "@/components/Switch/Switch";
import { Layer } from "@/models/layer";
import { twMerge } from "@/utils/twMerge";
import { MouseEventHandler } from "react";
import { Draggable } from "react-beautiful-dnd";

export interface LayerItemProps {
  index: number;
  layer: Layer;
  active: boolean;
  onToggle: (enabled: boolean) => void;
  onClick: MouseEventHandler;
}

export const LayerItem = ({
  layer,
  index,
  active,
  onToggle,
  onClick,
}: LayerItemProps) => {
  return (
    <Draggable draggableId={layer.id} index={index}>
      {(provided, snap) => {
        const wrapperClassNames = twMerge(
          "flex items-center group justify-between p-3 rounded-2xl last:mb-0 transition-colors transitions-shadow duration-100 cursor-pointer",
          {
            "bg-neutral-600": active || snap.isDragging,
            "hover:bg-neutral-600": !active,
            "shadow-xl": active || snap.isDragging,
          },
        );

        const titleClassNames = twMerge(
          "font-medium text-xs line-clamp-1 cursor-text",
          {
            "text-slate-300": active,
          },
        );
        return (
          <div
            ref={provided.innerRef}
            className={wrapperClassNames}
            onClick={onClick}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h3 className={titleClassNames}>{layer.name}</h3>
            <Switch
              className={twMerge("hidden group-hover:flex", { flex: active })}
              active={layer.enabled}
              onToggle={onToggle}
            />
          </div>
        );
      }}
    </Draggable>
  );
};
