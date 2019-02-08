import chroma from "chroma-js";
import { css } from "styled-components";

export const pink = chroma.hex("#FF55BF");
export const purple_dark = chroma.hex("#481770");
export const purple_light = chroma.hex("#A636FF");

export const text_dark = chroma("black").alpha(0.87);
export const text_light = chroma("black").alpha(0.6);

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
