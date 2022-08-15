import React from "react";
import styled from "@emotion/styled";

import { useStore } from "@src/store";

import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const { store } = useStore();

  return (
    <Root>
      <Header />
      {children}
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
