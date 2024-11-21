import { wrapEffect } from "@react-three/postprocessing";

import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = `
uniform float noiseIntensity;
uniform float noiseSize;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 noise = vec3(rand(uv / noiseSize * (1.0 + time)) * noiseIntensity);
  #ifdef PREMULTIPLY
  outputColor = vec4(min(inputColor.rgb * noise, vec3(1.0)), inputColor.a);
  #else
  outputColor = vec4(noise, inputColor.a);
  #endif
}`;

class NoiseEffectImpl extends Effect {
  /**
   * Constructs a new noise effect.
   *
   * @param {Object} [options] - The options.
   * @param {BlendFunction} [options.blendFunction=BlendFunction.SCREEN] - The blend function of this effect.
   * @param {Boolean} [options.premultiply=false] - Whether the noise should be multiplied with the input colors prior to blending.
   * @param {Number} [options.noiseIntensity=1.0] - The intensity of the noise.
   * @param {Number} [options.noiseSize=1.0] - The size of the noise.
   */
  constructor({
    blendFunction = BlendFunction.SCREEN,
    premultiply = false,
    noiseIntensity = 1.0,
    noiseSize = 1.0,
  } = {}) {
    super("NoiseEffect", fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ["noiseIntensity", new Uniform(noiseIntensity)],
        ["noiseSize", new Uniform(noiseSize)],
      ]),
    });
    this.premultiply = premultiply;
  }
  /**
   * Indicates whether noise will be multiplied with the input colors prior to blending.
   *
   * @type {Boolean}
   */
  get premultiply() {
    return this.defines.has("PREMULTIPLY");
  }

  set premultiply(value: boolean) {
    if (this.premultiply !== value) {
      if (value) {
        this.defines.set("PREMULTIPLY", "1");
      } else {
        this.defines.delete("PREMULTIPLY");
      }
      this.setChanged();
    }
  }
  /**
   * Indicates whether noise will be multiplied with the input colors prior to blending.
   *
   * @deprecated Use premultiply instead.
   * @return {Boolean} Whether noise is premultiplied.
   */
  isPremultiplied() {
    return this.premultiply;
  }
  /**
   * Controls whether noise should be multiplied with the input colors prior to blending.
   *
   * @deprecated Use premultiply instead.
   * @param {Boolean} value - Whether noise should be premultiplied.
   */
  setPremultiplied(value: boolean) {
    this.premultiply = value;
  }
}

export const Noise = wrapEffect(NoiseEffectImpl);
