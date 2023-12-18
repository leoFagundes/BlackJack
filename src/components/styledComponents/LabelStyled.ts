import { styled } from "styled-components";

export const LabelContainer = styled.div<{
    width?: string
    height?: string
    margin?: string
    cursor?: string
}>`
    width: ${(props) => props.width || '114px'};
    height: ${(props) => props.height || 'auto'};
    margin: ${(props) => props.margin || '0'};
    background-color: rgba(73, 73, 73, 0.8);
    color: #fff;
    text-align: center;
    padding: 5px 10px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.50);
    border-radius: 15px;
    font-size: 12px;

    &:hover {
        cursor: ${(props) => props.cursor || 'default'};
    }
`