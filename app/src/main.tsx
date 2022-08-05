import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { About } from "@screens/About";
import { Home } from "@screens/Home";
import { ThemeWrapper } from "@src/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeWrapper>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Navigate to="/" />} path="*" />
        </Routes>
      </BrowserRouter>
    </ThemeWrapper>
  </React.StrictMode>
);
