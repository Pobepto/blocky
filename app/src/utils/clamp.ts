export const clamp = (n: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, n));
};
