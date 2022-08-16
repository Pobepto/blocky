const COLOR_MAP = [
  "#00B7D8",
  "#FF424B",
  "#00B579",
  "#FFA144",
  "#F6E600",
  "#00B7D8",
  "#FF424B",
  "#00B579",
  "#FFA144",
  "#F6E600",
];

export const getColorFromIndex = (index: number) => {
  const str = String(index);
  const symbol = Number(str.slice(-1));
  return COLOR_MAP[symbol];
};
