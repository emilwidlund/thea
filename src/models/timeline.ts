import { z } from "zod";

export const TimelineModel = z.object({
  playhead: z.number().default(0),
  fps: z.number().default(4),
});

export type Timeline = z.infer<typeof TimelineModel>;