import { z } from "zod";
import { v4 as uuid } from "uuid";
import { Texture } from "three";

// Base Model for Layers

export const LayerTypeModel = z.enum(["IMAGE_SEQUENCE", "ADJUSTMENT"]);

export type LayerType = z.infer<typeof LayerTypeModel>;

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
  textures: z.array(z.instanceof(Texture)),
});

export type ImageSequenceLayer = z.infer<typeof ImageSequenceLayerModel>;

export const AdjustmentLayerModel = BaseLayerModel.extend({
  type: LayerTypeModel.default("ADJUSTMENT"),
});

export type AdjustmentLayer = z.infer<typeof AdjustmentLayerModel>;

export const LayerModel = z.union([
  ImageSequenceLayerModel,
  AdjustmentLayerModel,
]);

export type Layer = z.infer<typeof LayerModel>;
