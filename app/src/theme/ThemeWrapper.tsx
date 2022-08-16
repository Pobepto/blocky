import React from "react";
import { ThemeProvider } from "@emotion/react";

import { useStore } from "@src/store";

import { colors, THEME_TYPE } from "./colors";
import { GlobalStyles } from "./GlobalStyles";

interface Props {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<Props> = ({ children }) => {
  const { store } = useStore();
  const themeColors = colors[THEME_TYPE.DARK];
  const color = store.blockchain?.color ?? themeColors.red;
  const theme = { colors: themeColors, color };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
