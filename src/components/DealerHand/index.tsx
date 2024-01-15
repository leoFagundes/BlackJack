import React from "react";
import { CardImage } from "../styledComponents/CardStyled";
import { Cards } from "@/types/types";
import styled from "styled-components";
import { SomaLabel } from "../styledComponents/SomaLabelStyled";
import { LabelContainer } from "../styledComponents/LabelStyled";

interface Props {
  dealerHand: Cards[];
  dealerValue: number;
}

interface StyledDivProps {
  index: number;
  totalitems: number;
}

const DealerHandContainer = styled.div`
  display: flex;

  @media screen and (max-width: 400px) {
    max-width: 280px;
    overflow: scroll;
    border-radius: 15px;
  }
`;

const StyledDiv = styled.div<StyledDivProps>`
  flex-shrink: 0;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => `translateX(${props.index * -60}px)`};

  @media screen and (max-width: 400px) {
    width: ${(props) =>
    `${100 / props.totalitems}%`};
    transform: none;
  }
`;

export default function DealerHand({ dealerHand, dealerValue }: Props) {
  return (
    <DealerHandContainer>
      {dealerHand && dealerHand.length > 0 ? (
        <>
          <SomaLabel color={dealerValue > 21 ? "#cf1212" : "#fff"}>
            Soma: {dealerValue}
          </SomaLabel>
          {dealerHand.map((props, index) => (
            <StyledDiv key={index} index={index} totalitems={dealerHand.length}>
              <CardImage src={props.image} animation="true" />
              {dealerHand && dealerHand.length == 1 && (
                <CardImage src="https://deckofcardsapi.com/static/img/back.png" />
              )}
            </StyledDiv>
          ))}
        </>
      ) : (
        <>
          <CardImage
            animation="true"
            src="https://deckofcardsapi.com/static/img/back.png"
          />
        </>
      )}
      {/* {dealerHand && dealerHand.length == 1 && (
        <StyledDiv index={1} totalitems={2}>
          <CardImage src="https://deckofcardsapi.com/static/img/back.png" />
        </StyledDiv>
      )} */}
      <LabelContainer>Mão do Dealer</LabelContainer>
    </DealerHandContainer>
  );
}
