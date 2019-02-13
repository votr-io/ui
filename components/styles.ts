import chroma, { ChromaStatic } from "chroma-js";
import { css } from "@emotion/core";

export const pink = chroma.hex("#FF5794");
// export const purple_dark = chroma.hex("#481770");
// export const purple_light = chroma.hex("#A636FF");

export const purple = chroma.hex("#8F30CF");
export const gradient_dark = chroma.hex("#4D1A70");
export const gradient_light = chroma.hex("#EE8B97");

export const text_dark = chroma("black").alpha(0.87);
export const text_light = chroma("black").alpha(0.6);

export const disabled = chroma("black").alpha(0.4);
export const divider = chroma("black").alpha(0.25);

const makeShadow = (z: number) => {
  const style = css`
    box-shadow: 0 ${z}px ${z * 2}px rgba(0, 0, 0, 0.12),
      0 ${z / 2}px ${z / 2}px rgba(0, 0, 0, 0.24);
    z-index: ${z};
  `;

  return Object.assign(style, {
    inset: css`
      box-shadow: inset 0 ${z}px ${z * 2}px rgba(0, 0, 0, 0.12),
        inset 0 ${z / 2}px ${z / 2}px rgba(0, 0, 0, 0.24);
    `
  });
};

export const elevations = [1, 2, 4].map(makeShadow);

const opacityMap = {
  hover: 0.04,
  focus: 0.12,
  selected: 0.08,
  activated: 0.12,
  pressed: 0.16,
  dragged: 0.08
};

export function opacity(color: chroma.Color, state: keyof typeof opacityMap) {
  return color.luminance() > 0.5 ? 2 : 1 * opacityMap[state];
}
