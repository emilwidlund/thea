import { z } from "zod";
import { LayerModel } from "./layer";

export const CompositionModel = z.object({
  id: z.string(),
  title: z.string(),
  layers: z.array(LayerModel),
});
