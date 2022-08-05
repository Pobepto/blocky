import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeWrapper } from "@src/theme";

import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </React.StrictMode>
);
