import styled from "@emotion/styled";

export const OffsetBlock = styled.div<{ left: number; top: number }>`
  position: absolute;
  top: calc(50% + ${({ top }) => `${top}px`});
  left: calc(50% + ${({ left }) => `${left}px`});
  transform: translate(-50%, -50%);
`;
