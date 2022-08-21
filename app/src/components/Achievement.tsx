import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as StarIcon } from "@assets/images/star.svg";
import { useAchievement } from "@src/hooks/useAchievement";

import { Sidebar } from "./Sidebar";

interface Props {
  close: () => void;
  isOpen: boolean;
}

export const Achievement: React.FC<Props> = ({ close, isOpen }) => {
  const [achievements, unlocked] = useAchievement();

  return (
    <Sidebar close={close} isOpen={isOpen} title="ACHIEVEMENTS">
      <Content>
        {achievements.map((ach) => {
          const received = unlocked.includes(ach.id);
          return (
            <Category key={ach.id}>
              {received && <StarIcon />}
              <span>{ach.isHidden ? "????? ????? ?????" : ach.title}</span>
              {received && <StarIcon />}
            </Category>
          );
        })}
      </Content>
      <Footer>
        <span onClick={() => close()}>CANCEL</span>
      </Footer>
    </Sidebar>
  );
};

const Content = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  flex-grow: 1;
  width: 90%;
`;

const Category = styled.div`
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 0 16px;
  }

  svg {
    color: ${({ theme }) => theme.color};
  }
`;

const Footer = styled.div`
  display: flex;
  gap: 100px;
  align-items: center;
  margin-bottom: 20px;

  > span:nth-of-type(1) {
    font-size: 12px;
  }

  > span {
    cursor: pointer;
    :hover {
      color: ${({ theme }) => theme.color};
    }
  }
`;
