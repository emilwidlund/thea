import { z } from "zod";
import { v4 as uuid } from "uuid";

// Base Model for Layers

export const LayerTypeModel = z.enum(["IMAGE", "ADJUSTMENT"]);

export const BaseLayerModel = z.object({
  id: z.string().default(() => uuid()),
  name: z.string().default("Untitled"),
  visible: z.boolean().default(true),
  opacity: z.number().default(1),
  type: LayerTypeModel,
});

// Layer Models

export const ImageLayerModel = BaseLayerModel.extend({
  type: LayerTypeModel.default("IMAGE"),
  src: z.string(),
});

export const AdjustmentLayerModel = BaseLayerModel.extend({
  type: LayerTypeModel.default("ADJUSTMENT"),
});

export const LayerModel = z.union([ImageLayerModel, AdjustmentLayerModel]);

export type Layer = z.infer<typeof LayerModel>;
