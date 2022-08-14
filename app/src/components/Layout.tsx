import React, { useState } from "react";
import styled from "@emotion/styled";

import { ReactComponent as ImportantIcon } from "@assets/images/important.svg";
import { ReactComponent as PlusIcon } from "@assets/images/plus.svg";
import { ReactComponent as QuestionIcon } from "@assets/images/question.svg";
import { useTVL } from "@src/hooks/useTVL";

import { Header } from "./Header";
import { Menu } from "./Menu";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const TVL = useTVL();

  return (
    <Root>
      <Header />
      {isMenuVisible && <Menu close={() => setMenuVisible(false)} />}
      {children}
      <Footer>
        {/* TODO: Fix footer block and make it absolute */}
        <TVLBlock>
          <span>{TVL.toString()} TVL</span>
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
  align-items: center;
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
