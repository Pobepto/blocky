export const getShortString = (str: string, symbols = 26) => {
  if (str.length <= symbols) return str;
  return `${str.slice(0, symbols / 2 + 2)}...${str.slice(-symbols / 2)}`;
};
