import React from "react";
import { styled } from "styled-components";

interface Props {
  playerScore: number;
  dealerScore: number;
}

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 5px;
  right: 5px;
  background-color: rgb(3, 117, 81);
  border-bottom: 2px solid rgb(0, 48, 33);
  border-right: 2px solid rgb(0, 48, 33);
  border-top: none;
  border-left: none;
  border-radius: 10px;
  padding: 10px 20px;
  color: white;
  gap: 15px;

  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;

    & > div {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export default function Score({ playerScore, dealerScore }: Props) {
  return (
    <ScoreContainer>
      <h4>Pontuação</h4>
      <div>
        <div title={`O Jogador tem ${playerScore} pontos`}>
          <p>Jogador:</p> <p>{playerScore}</p>
        </div>
        <div title={`A casa tem ${dealerScore} pontos`}>
          <p>Casa:</p> <p>{dealerScore}</p>
        </div>
      </div>
    </ScoreContainer>
  );
}
