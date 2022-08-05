type ColorTypes = "white" | "blue" | "red" | "green" | "orange" | "yellow";

export type Colors = Record<ColorTypes, string>;
export enum THEME_TYPE {
  DARK,
}

const DARK_COLORS: Colors = {
  white: "#FFFFFF",
  blue: "#00B7D8",
  red: "#FF424B",
  green: "#00B579",
  orange: "#FFA144",
  yellow: "#F6E600",
};

export const colors: Record<THEME_TYPE, Colors> = {
  [THEME_TYPE.DARK]: DARK_COLORS,
};
