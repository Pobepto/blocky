import React, { useRef } from "react";
import styled from "@emotion/styled";

import { useOnClickOutside } from "@src/hooks/useOnClickOutside";

interface Props {
  title: string;
  close: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export const Sidebar: React.FC<Props> = ({
  title,
  close,
  isOpen,
  children,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(sidebarRef, () => close());

  return (
    <Root ref={sidebarRef} isOpen={isOpen}>
      <Title>{title}</Title>
      {children}
    </Root>
  );
};

const Root = styled.div<{ isOpen: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 550px;
  height: 100vh;
  border-left: 2px solid ${({ theme }) => theme.color};
  background: #00000099;
  top: 0;
  right: 0;
  z-index: 1;
  transition: right 0.3s ease-in-out;
  right: ${({ isOpen }) => (isOpen ? "0" : "-550px")};
`;

const Title = styled.span`
  font-size: 20px;
  padding-top: 50px;
  margin-bottom: 20px;
`;
