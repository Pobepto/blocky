import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";


import { About } from "@screens/About";
import { Auth } from "@screens/Auth";
import { Home } from "@screens/Home";
import { ThemeWrapper } from "@src/theme";
import { getProviderLibrary } from "@utils/metamask";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getProviderLibrary}>
      <ThemeWrapper>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<About />} path="/about" />
            <Route element={<Auth />} path="/auth" />
            <Route element={<Navigate to="/" />} path="*" />
          </Routes>
        </BrowserRouter>
      </ThemeWrapper>
    </Web3ReactProvider>
  </React.StrictMode>
);
