import React from "react";
import { css, Global, useTheme } from "@emotion/react";

import darkBackground from "@assets/images/darkBackground.svg";
import whiteBackground from "@assets/images/whiteBackground.svg";

import { THEME_TYPE } from "./colors";

import "normalize.css";

interface Props {
  themeType: THEME_TYPE;
}

export const GlobalStyles: React.FC<Props> = ({ themeType }) => {
  const { colors } = useTheme();
  const bgSvg =
    themeType === THEME_TYPE.DARK ? darkBackground : whiteBackground;
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: "Rubik", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: ${colors.nPrimary};
          overflow-x: hidden;
          background: url(${bgSvg}) center no-repeat;
          background-size: cover;
        }
      `}
    />
  );
};
