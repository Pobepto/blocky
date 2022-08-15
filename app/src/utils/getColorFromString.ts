import ColorHash from "color-hash";

import { clamp } from "./clamp";

const colorHash = new ColorHash();

export const getColorFromString = (str: string) => {
  const [h, s, l] = colorHash.hsl(str);

  return [h, clamp(s * 100, 50, 100), clamp(l * 100, 40, 80)];
};
