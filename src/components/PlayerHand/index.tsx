import React from "react";
import { CardImage } from "../styledComponents/CardStyled";
import { Cards } from "@/types/types";
import styled from "styled-components";
import { SomaLabel } from "../styledComponents/SomaLabelStyled";

interface Props {
  playerHand: Cards[];
  playerValue: number;
}

interface StyledDivProps {
  index: number;
  totalItems: number;
}

const PlayerHandContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

const StyledDiv = styled.div<StyledDivProps>`
  flex-shrink: 0; /* Evita que as divs afetem o tamanho do container */
  width: ${(props) =>
    `${100 / props.totalItems}%`}; /* Distribui igualmente a largura */
  box-sizing: border-box; /* Inclui padding e bordas na largura */
  transform: ${(props) => `translateX(${props.index * -60}px)`};
  transition: transform 0.3s ease-in-out;
`;

export default function PlayerHand({ playerHand, playerValue }: Props) {
  return (
    <PlayerHandContainer>
      {playerHand && playerHand.length > 0 ? (
        <>
          <SomaLabel>Soma do Jogador: {playerValue}</SomaLabel>
          {playerHand.map((props, index) => (
            <StyledDiv key={index} index={index} totalItems={playerHand.length}>
              <CardImage src={props.image} />
            </StyledDiv>
          ))}
        </>
      ) : (
        "Player Hand"
      )}
    </PlayerHandContainer>
  );
}
