import { Layer, LayerModel } from "@/models/layer";
import { Canvas } from "./Canvas";
import { LayerPanel } from "./LayerPanel";

const layers = [
  {
    type: "IMAGE_SEQUENCE",
    name: "Layer 1",
    enabled: true,
    opacity: 100,
    src: "https://www.w3schools.com/howto/img_forest.jpg",
  },
].map((layer) => LayerModel.parse(layer));

export const Editor = () => {
  return (
    <div className="flex flex-row items-stretch">
      <Canvas className="max-w-5xl aspect-square w-full" />
      <LayerPanel layers={layers} />
    </div>
  );
};
