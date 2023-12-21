import { styled } from "styled-components";

export const SomaLabel = styled.div<{
  color?: string;
}>`
  position: absolute;
  transform: translateY(-25px);
  color: ${(props) => props.color || "#fff"};
`;
