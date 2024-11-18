import { z } from "zod";
import { v4 as uuid } from "uuid";

// Base Model for Layers

export const LayerTypeModel = z.enum(["IMAGE_SEQUENCE", "ADJUSTMENT"]);

export const BaseLayerModel = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuid()),
  name: z.string().default("Untitled"),
  enabled: z.boolean().default(true),
  opacity: z.number().default(1),
  type: LayerTypeModel,
});

// Layer Models

export const ImageSequenceLayerModel = BaseLayerModel.extend({
  type: LayerTypeModel.default("IMAGE_SEQUENCE"),
  src: z.string(),
});

export const AdjustmentLayerModel = BaseLayerModel.extend({
  type: LayerTypeModel.default("ADJUSTMENT"),
});

export const LayerModel = z.union([
  ImageSequenceLayerModel,
  AdjustmentLayerModel,
]);

export type Layer = z.infer<typeof LayerModel>;
