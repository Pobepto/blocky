import React, { useState } from "react";
import styled from "@emotion/styled";

import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";

import { Header } from "./Header";
import { Menu } from "./Menu";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <Root>
      <Header />
      {isMenuVisible && <Menu />}
      {children}
      <Footer>
        {/* TODO: Fix footer block and make it absolute */}
        <StyledPlusIcon onClick={() => setMenuVisible(true)} />
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px 50px;
`;

const StyledPlusIcon = styled(PlusIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(90deg);
  }
`;
