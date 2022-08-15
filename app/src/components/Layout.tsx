import React, { useState } from "react";
import styled from "@emotion/styled";

import { ReactComponent as ImportantIcon } from "@assets/images/important.svg";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as QuestionIcon } from "@assets/images/question.svg";
import { useStore } from "@src/store";

import { Header } from "./Header";
import { Menu } from "./Menu";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const { store } = useStore();

  const { liquidity, liquidityPerBlock, usedTps, tps } = store.blockchain ?? {};

  return (
    <Root>
      <Header />
      <Menu close={() => setMenuVisible(false)} isOpen={isMenuVisible} />
      {children}
      {/* TODO: Fix footer block and make it absolute */}
      <Footer>
        <TVLBlock>
          <span>
            {liquidity?.toString() ?? "0"} (+
            {liquidityPerBlock?.toString() ?? "0"}) Liqudity
          </span>
          <span>
            {usedTps?.toString() ?? "0"}/{tps?.toString() ?? "0"} TPS
          </span>
        </TVLBlock>

        <ButtonsBlock>
          <StyledQuestionIcon />
          <StyledImportantIcon />
          <StyledPlusIcon onClick={() => setMenuVisible(true)} />
        </ButtonsBlock>
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
  justify-content: space-between;
  padding: 15px 50px;
`;

const TVLBlock = styled.div`
  display: flex;
  align-items: flex-start;
  user-select: none;
  flex-direction: column;

  span {
    margin: 3px 0;
  }
`;

const ButtonsBlock = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledPlusIcon = styled(PlusIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
const StyledQuestionIcon = styled(QuestionIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
const StyledImportantIcon = styled(ImportantIcon)`
  cursor: pointer;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: rotate(360deg);
  }
`;
