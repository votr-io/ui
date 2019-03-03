import chroma, { ChromaStatic } from "chroma-js";
import { css } from "@emotion/core";

export const pink = chroma.hex("#FF5794");

export const purple = chroma.hex("#8F30CF");
export const gradient_dark = chroma.hex("#4D1A70");
export const gradient_light = chroma.hex("#EE8B97");

export const text_dark = chroma("black").alpha(0.87);
export const text_light = chroma("black").alpha(0.6);

export const disabled = chroma("black").alpha(0.4);
export const divider = chroma("black").alpha(0.25);

export const background = chroma.hex("#eee");
export const foreground = chroma.hex("#f7f7f7");
export const white = chroma.hex("#fff");
export const card = chroma.hex("#fff");

export const makeShadow = (elevation: number) => {
  const style = css`
    z-index: ${elevation};
    box-shadow: 0px ${elevation}px ${elevation * 1.5}px ${elevation * 0.1}px
        rgba(0, 0, 0, 0.14),
      0px ${elevation * 0.4}px ${elevation * 1.9}px ${elevation * 0.3}px
        rgba(0, 0, 0, 0.12),
      0px ${elevation * 0.5}px ${elevation * 0.75}px rgba(0, 0, 0, 0.2);
  `;

  return Object.assign(style, {
    inset: css`
      box-shadow: inset 0px ${elevation}px ${elevation * 1.5}px
          ${elevation * 0.1}px rgba(0, 0, 0, 0.14),
        inset 0px ${elevation * 0.4}px ${elevation * 1.9}px ${elevation * 0.3}px
          rgba(0, 0, 0, 0.12),
        inset 0px ${elevation * 0.5}px ${elevation * 0.75}px rgba(0, 0, 0, 0.2);
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
