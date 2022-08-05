import React from "react";
import { css, Global, useTheme } from "@emotion/react";

import darkBackground from "@assets/images/bg.svg";

import "normalize.css";

export const GlobalStyles: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        body {
          margin: 0;
          overflow-x: hidden;
          background: url(${darkBackground}) no-repeat center center fixed;
          background-size: cover;

          font-family: "Press Start 2P", cursive;
          color: ${colors.white};
          height: 100vh;
        }

        a {
          text-decoration: none;
          color: unset;
          text-align: unset;
        }
      `}
    />
  );
};
