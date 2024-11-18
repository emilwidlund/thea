import { Layer } from "@/models/layer";

export interface LayerPanelProps {
  layers: Layer[];
}

export const LayerPanel = ({ layers }: LayerPanelProps) => {
  return (
    <div className="flex flex-col">
      {layers.map((layer) => (
        <LayerItem key={layer.id} layer={layer} />
      ))}
    </div>
  );
};

export interface LayerItemProps {
  layer: Layer;
}

export const LayerItem = ({ layer }: LayerItemProps) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" checked={layer.visible} />
      <span>{layer.name}</span>
    </div>
  );
};
