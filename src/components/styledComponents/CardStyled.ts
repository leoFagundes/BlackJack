import { styled } from "styled-components";

export const CardImage = styled.img<{
    width?: string
    height?: string
    cursor?: string
}>`
    width: ${(props) => props.width || 'auto'};
    height: ${(props) => props.height || '192px'};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    &:hover {
        cursor: ${(props) => props.cursor || 'default'};
    }
`