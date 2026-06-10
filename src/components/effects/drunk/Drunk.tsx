import DrunkEffect from "./DrunkEffect"
import type { DrunkEffectProps } from "./DrunkProps";
import { forwardRef } from "react";

const Drunk = forwardRef<DrunkEffect, DrunkEffectProps>((props, ref) => {
  const drunkEffect = new DrunkEffect(props);

  return (
    <primitive ref={ref} object={drunkEffect} />
  )
})

export default Drunk;