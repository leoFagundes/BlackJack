import { styled } from "styled-components";

export const Button = styled.button<{
  width?: string;
  height?: string;
  cursor?: string;
}>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  font-size: 16px;
  background-color: rgb(3, 117, 81);
  border-bottom: 2px solid rgb(0, 48, 33);
  border-right: 2px solid rgb(0, 48, 33);
  border-top: none;
  border-left: none;
  color: #fff;
  padding: 5px 15px;

  &:hover {
    cursor: ${(props) => props.cursor || "pointer"};
    background-color: rgb(0, 100, 80);
  }
`;
