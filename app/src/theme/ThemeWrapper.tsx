import React from "react";
import { ThemeProvider } from "@emotion/react";

import { colors, THEME_TYPE } from "./colors";
import { GlobalStyles } from "./GlobalStyles";

interface Props {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<Props> = ({ children }) => {
  const themeColors = colors[THEME_TYPE.DARK];
  const theme = { colors: themeColors };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};
