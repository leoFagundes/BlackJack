import { styled } from "styled-components";

export const CardImage = styled.img<{
  width?: string;
  height?: string;
  cursor?: string;
  boxshadow?: string;
  animation?: "true" | "false";
}>`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "192px"};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  animation: ${(props) =>
    props.animation == "true" ? "SlideInAnimation 0.5s ease-in-out;" : ""};

  &:hover {
    cursor: ${(props) => props.cursor || "default"};
  }

  @keyframes SlideInAnimation {
    0% {
      transform: translateX(20px);
      opacity: 0.5;
    }
    85% {
      transform: translateX(-2px);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
