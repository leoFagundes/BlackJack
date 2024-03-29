import React from "react";
import { CardImage } from "../styledComponents/CardStyled";
import { Cards } from "@/types/types";
import styled from "styled-components";
import { SomaLabel } from "../styledComponents/SomaLabelStyled";
import { LabelContainer } from "../styledComponents/LabelStyled";

interface Props {
  playerHand: Cards[];
  playerValue: number;
}

interface StyledDivProps {
  index: number;
  totalitems: number;
}

const PlayerHandContainer = styled.div`
  display: flex;
  overflow: hidden;

  @media screen and (max-width: 400px) {
    max-width: 280px;
    overflow: scroll;
    border-radius: 15px;
  }
`;

const StyledDiv = styled.div<StyledDivProps>`
  flex-shrink: 0; /* Evita que as divs afetem o tamanho do container */
  width: ${(props) =>
    `${100 / props.totalitems}%`}; /* Distribui igualmente a largura */
  box-sizing: border-box; /* Inclui padding e bordas na largura */
  transform: ${(props) => `translateX(${props.index * -60}px)`};
  transition: transform 0.3s ease-in-out;

  @media screen and (max-width: 400px) {
    transform: none;
  }
`;

export default function PlayerHand({ playerHand, playerValue }: Props) {
  return (
    <PlayerHandContainer>
      {playerHand && playerHand.length > 0 ? (
        <>
          <SomaLabel color={playerValue > 21 ? "#cf1212" : "#fff"}>
            Soma: {playerValue}
          </SomaLabel>
          {playerHand.map((props, index) => (
            <StyledDiv key={index} index={index} totalitems={playerHand.length}>
              <CardImage src={props.image} animation="true" />
            </StyledDiv>
          ))}
          <LabelContainer>Mão do Jogador</LabelContainer>
        </>
      ) : (
        <>
          <CardImage src="https://deckofcardsapi.com/static/img/back.png" />
          <LabelContainer>Mão do Jogador</LabelContainer>
        </>
      )}
    </PlayerHandContainer>
  );
}
