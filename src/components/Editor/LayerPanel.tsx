import { StrictModeDroppable } from "@/components/StrictModeDroppable/StrictModeDroppable";
import { Layer } from "@/models/layer";
import {
  DragDropContext,
  OnDragEndResponder,
  OnDragStartResponder,
} from "react-beautiful-dnd";
import { LayerItem } from "./LayerItem";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

export interface LayerPanelProps {
  layers: Layer[];
}

export const LayerPanel = ({ layers }: LayerPanelProps) => {
  const [activeLayer, setActiveLayer] = useState<Layer | null>(null);

  const router = useRouter();

  const createSelectLayerHandler = useCallback(
    (layer: Layer) => {
      return () => {
        router.replace({
          query: {
            ...router.query,
            activeLayerId: layer.id,
          },
        });
      };
    },
    [router],
  );

  const handleDragStart: OnDragStartResponder = useCallback(
    (result) => {
      router.replace({
        query: {
          ...router.query,
          activeLayerId: result.draggableId,
        },
      });
    },
    [router],
  );

  const handleDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      // dropped outside the list
      if (!result.destination) {
        return;
      }

      // reorder using index of source and destination.
      const itemsCopy = layers.slice();
      const [removed] = itemsCopy.splice(result.source.index, 1);
      // put the removed one into destination.
      itemsCopy.splice(result.destination.index, 0, removed);

      const order = itemsCopy
        .slice()
        .reverse()
        .map((layer) => layer.id);
    },
    [layers],
  );

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <StrictModeDroppable droppableId="layers">
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="flex flex-col grow w-96"
            {...provided.droppableProps}
          >
            {layers.map((layer, index) => (
              <LayerItem
                key={layer.id}
                index={index}
                layer={layer}
                onToggle={(toggled) => {
                  // Handle
                }}
                onClick={createSelectLayerHandler(layer)}
                active={activeLayer?.id === layer.id}
              />
            ))}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};
