import React from "react";
import { CardImage } from "../styledComponents/CardStyled";
import { Cards } from "@/types/types";
import styled from "styled-components";
import { SomaLabel } from "../styledComponents/SomaLabelStyled";

interface Props {
  dealerHand: Cards[];
  dealerValue: number;
}

interface StyledDivProps {
  index: number;
  totalItems: number;
}

const DealerHandContainer = styled.div`
  display: flex;
`;

const StyledDiv = styled.div<StyledDivProps>`
  flex-shrink: 0;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(${props.index * -60}px)`};
`;

export default function DealerHand({ dealerHand, dealerValue }: Props) {
  return (
    <DealerHandContainer>
      {dealerHand && dealerHand.length > 0 ? (
        <>
          <SomaLabel>Soma do Dealer: {dealerValue}</SomaLabel>
          {dealerHand.map((props, index) => (
            <StyledDiv key={index} index={index} totalItems={dealerHand.length}>
              <CardImage src={props.image} />
            </StyledDiv>
          ))}
        </>
      ) : (
        "Dealer Hand"
      )}
      {dealerHand.length === 1 && (
        <StyledDiv index={1} totalItems={2}>
          <CardImage src="https://deckofcardsapi.com/static/img/back.png" />
        </StyledDiv>
      )}
    </DealerHandContainer>
  );
}
