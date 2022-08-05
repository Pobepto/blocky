import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

import { About } from "@screens/About";
import { Auth } from "@screens/Auth";
import { Home } from "@screens/Home";
import { ThemeWrapper } from "@src/theme";
import { hooks as metaMaskHooks, metaMask } from "@utils/metamask";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask as any, metaMaskHooks]];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
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
