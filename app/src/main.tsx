import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";

import { GuardRoute } from "@components/GuardRoute";
import { About } from "@screens/About";
import { Game } from "@screens/Game";
import { ThemeWrapper } from "@src/theme";
import { hooks, metaMask } from "@utils/metamask";

import { Store } from "./store";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, hooks]];

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <Store>
        <ThemeWrapper>
          <BrowserRouter>
            <Routes>
              {/* <Route element={<Auth />} path="/" /> */}
              <Route
                element={
                  <GuardRoute>
                    <Game />
                  </GuardRoute>
                }
                path="/"
              />
              <Route
                element={
                  <GuardRoute>
                    <About />
                  </GuardRoute>
                }
                path="/about"
              />
              <Route element={<Navigate to="/" />} path="*" />
            </Routes>
          </BrowserRouter>
        </ThemeWrapper>
      </Store>
    </Web3ReactProvider>
  </React.StrictMode>
);
