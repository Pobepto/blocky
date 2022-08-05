import React from "react";
import styled from "@emotion/styled";

import { ReactComponent as Logo } from "@assets/images/logo.svg";

export const Header: React.FC = () => {
  return (
    <Root>
      <LogoBlock>
        <Logo />
      </LogoBlock>
      <MenuBlock>
        <MenuItem>HOME</MenuItem>
        <MenuItem>ABOUT</MenuItem>
      </MenuBlock>
      <AddressBlock>
        <Address>0xab7d...b7e43</Address>
      </AddressBlock>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 50px;
  /* width: 100%; */
`;
const LogoBlock = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.red};
`;
const MenuBlock = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 100px;
  grid-template-areas: ". .";
`;
const MenuItem = styled.span`
  text-align: center;
  font-size: 16px;
  cursor: pointer;

  :after {
    display: block;
    position: relative;
    top: 5px;
    content: "";
    border-bottom: solid 3px ${({ theme }) => theme.colors.red};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :hover:after {
    transform: scaleX(1);
  }
`;
const AddressBlock = styled.div``;
const Address = styled.span`
  text-align: center;
  font-size: 14px;
  cursor: pointer;

  :after {
    display: block;
    position: relative;
    top: 5px;
    content: "";
    border-bottom: solid 3px ${({ theme }) => theme.colors.red};
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  :hover:after {
    transform: scaleX(1);
  }
`;
