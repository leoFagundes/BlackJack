import { styled } from "styled-components";

export const CardImage = styled.img<{
  width?: string;
  height?: string;
  cursor?: string;
  boxshadow?: string;
}>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "192px"};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;

  &:hover {
    cursor: ${(props) => props.cursor || "default"};
  }
`;
