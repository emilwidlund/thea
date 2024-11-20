import { z } from "zod";
import { v4 as uuid } from "uuid";
import { LayerModel } from "./layer";
import { TimelineModel } from "./timeline";

export const CompositionModel = z.object({
  id: z.string().default(() => uuid()),
  title: z.string().default("Untitled"),
  layers: z.array(LayerModel),
  timeline: TimelineModel,
});

export type Composition = z.infer<typeof CompositionModel>;