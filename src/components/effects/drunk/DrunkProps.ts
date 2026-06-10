import type { BlendFunction } from "postprocessing";

export type DrunkEffectProps = {
  frequency?: number;
  amplitude?: number;
  speed?: number;
  color?: [number, number, number];
  blendFunction?: BlendFunction;
};