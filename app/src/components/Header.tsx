import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { ReactComponent as Logo } from "@assets/images/logo.svg";

export const Header: React.FC = () => {
  return (
    <Root>
      <LogoBlock>
        <Link to="/">
          <Logo />
        </Link>
      </LogoBlock>
      <MenuBlock>
        <MenuItem>
          <Link to="/">HOME</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about">ABOUT</Link>
        </MenuItem>
      </MenuBlock>
      <AddressBlock>
        <span>0xab7d...b7e43</span>
        <span>DISCONNECT</span>
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
  width: 160px;
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
const AddressBlock = styled.div`
  width: 160px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;

  span:nth-of-type(2) {
    display: none;
  }

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
  :hover span:nth-of-type(1) {
    display: none;
  }
  :hover span:nth-of-type(2) {
    display: block;
  }
`;
