import React from "react";
import styled from "@emotion/styled";

import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Root>
      <Header />
      {children}
    </Root>
  );
};

const Root = styled.div``;
