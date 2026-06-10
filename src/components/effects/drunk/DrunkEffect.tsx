import { BlendFunction, Effect } from "postprocessing";
import type { DrunkEffectProps } from "./DrunkProps";
import { Uniform } from "three";

const fragmentShader = /* glsl */ `
  uniform float frequency;
  uniform float amplitude;
  uniform float speed;
  uniform vec3 color;
  uniform float offset;

  void mainUv(inout vec2 uv) {
    uv.y += sin((uv.x * frequency) + offset) * amplitude;
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = vec4(color, inputColor.a);
  }
`;

export default class DrunkEffect extends Effect {
  private offset: Uniform<number>;
  private speedUniform: Uniform<number>;

  constructor({
    frequency = 2,
    amplitude = 0.1,
    speed = 1,
    color = [0.8, 1.0, 0.5],
    blendFunction = BlendFunction.DARKEN,
  }: DrunkEffectProps) {
    const offset = new Uniform(0);
    const speedUniform = new Uniform(speed);
    
    super(
      "DrunkEffect",
      fragmentShader,
      {
          uniforms: new Map<string, Uniform<unknown>>([
            ["frequency", new Uniform(frequency)],
            ["amplitude", new Uniform(amplitude)],
            ["speed", speedUniform],
            ["color", new Uniform(color)],
            ["offset", offset],
          ]),
          blendFunction: blendFunction,
      }
    );

    this.offset = offset;
    this.speedUniform = speedUniform;
  }

  update(renderer: unknown, inputBuffer: unknown, deltaTime: number) {
    this.offset.value += deltaTime * this.speedUniform.value;
  }
}