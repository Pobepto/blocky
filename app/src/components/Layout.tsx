import React from "react";
import styled from "@emotion/styled";

import { Header } from "./Header";
import { Menu } from "./Menu";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Root>
      <Header />
      <Menu />
      {children}
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
