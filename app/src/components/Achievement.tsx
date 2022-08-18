import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as StarIcon } from "@assets/images/star.svg";

import { Sidebar } from "./Sidebar";

interface Props {
  close: () => void;
  isOpen: boolean;
}

export const Achievement: React.FC<Props> = ({ close, isOpen }) => {
  return (
    <Sidebar close={close} isOpen={isOpen} title="ACHIEVEMENTS">
      <Content>
        <Category>
          <StarIcon />
          <span>Create first blockchain</span>
          <StarIcon />
        </Category>
        <Category>
          <StarIcon />
          <span>Get 10 TPS</span>
          <StarIcon />
        </Category>
        <Category>
          <StarIcon />
          <span>Win polygon Hackaton</span>
          <StarIcon />
        </Category>
        <Category>????? ????? ?????</Category>
        <Category>????? ????? ?????</Category>
        <Category>????? ????? ?????</Category>
        <Category>????? ????? ?????</Category>
        <Category>????? ????? ?????</Category>
        <Category>????? ????? ?????</Category>
        <Category>????? ????? ?????</Category>
        <Category>????? ????? ?????</Category>
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
