import React, { SetStateAction, useState } from "react";
import { Button } from "../styledComponents/ButtonStyled";
import {
  createPile,
  deckReturn,
  drawCards,
  listGame,
  reShuffleDeck,
} from "@/services/services";
import { Cards } from "@/types/types";
import DealerHand from "../DealerHand";
import { styled } from "styled-components";

interface Props {
  deckID: string;
  dealerValue: number;
  playerValue: number;
  dealerHand: Cards[];
  setDrawnCards: React.Dispatch<SetStateAction<string[]>>;
  setPlayerHand: React.Dispatch<SetStateAction<Cards[]>>;
  setDealerHand: React.Dispatch<SetStateAction<Cards[]>>;
  setDealerValue: React.Dispatch<SetStateAction<number>>;
  setPlayerValue: React.Dispatch<SetStateAction<number>>;
  setPlayerScore: React.Dispatch<SetStateAction<number>>;
  setDealerScore: React.Dispatch<SetStateAction<number>>;
  playerScore: number;
  dealerScore: number;
  isDouble: boolean;
  setIsDouble: React.Dispatch<SetStateAction<boolean>>;
}

export default function PlayerButtonsLogic({
  deckID,
  playerValue,
  dealerValue,
  dealerHand,
  setDrawnCards,
  setPlayerHand,
  setDealerHand,
  setDealerValue,
  setPlayerValue,
  setPlayerScore,
  setDealerScore,
  playerScore,
  dealerScore,
  isDouble,
  setIsDouble,
}: Props) {
  const [hitButtonDisabled, setHitButtonDisabled] = useState(false);
  const [standButtonDisabled, setStandButtonDisabled] = useState(false);
  const [doubleButtonDisabled, setDoubleButtonDisabled] = useState(false);
  const [HandleNewGame, setHandleNewGame] = useState(false);

  async function hitLogic() {
    console.log("Hit");
    // Compra X cartas para o player
    let cards = await drawCards(deckID, "1");
    setDrawnCards(cards);
    console.log("Cartas compradas para o jogador: ", cards);

    // Cria a mão do jogador
    await createPile(deckID, "playerHand", cards);

    // popula a mão do jogador com as cartas compradas
    const playerCards = await listGame(deckID, "playerHand");
    console.log("PLAYERCARDS: ", playerCards);
    setPlayerHand(playerCards);
  }

  async function standLogic() {
    setHitButtonDisabled(true);
    setStandButtonDisabled(true);
    setDoubleButtonDisabled(true);
    let verify = false;

    while (dealerValue < 17) {
      verify = false;
      console.log("Stand", dealerValue);

      let cards = await drawCards(deckID, "1");
      setDrawnCards(cards);
      console.log("Cartas compradas para o dealer: ", cards);

      await createPile(deckID, "dealerHand", cards);
      const dealerCards = await listGame(deckID, "dealerHand");
      console.log("DEALERCARDS: ", dealerCards);
      setDealerHand(dealerCards);

      // Atualiza o dealerValue aqui
      let sum = dealerCards.reduce((total: any, card: any) => {
        let cardValue = card.value;
        if (["KING", "QUEEN", "JACK"].includes(card.value)) {
          cardValue = "10";
        }
        if (card.value === "ACE") {
          cardValue = "11";
        }
        return total + parseInt(cardValue, 10);
      }, 0);

      // Verifica se a soma ultrapassou 21 e se há um Ás na mão
      if (sum > 21) {
        const aceIndices = dealerHand.reduce(
          (indices: number[], card, index: number) => {
            if (card.value === "ACE") {
              indices.push(index);
            }
            return indices;
          },
          [],
        );

        // Para cada Ás na mão, ajusta o valor do Ás para 1, se necessário
        aceIndices.forEach((aceIndex) => {
          dealerHand[aceIndex].value = "ACE";
          if (sum > 21) {
            sum -= 10; // Subtrai 10 da soma (troca o valor do Ás de 11 para 1)
          }
        });
      }
      // Atualiza o state com a soma dos valores
      setDealerValue(sum);

      // Verifica se a soma ultrapassou 21 após o ajuste do Ás
      if (sum > 21) {
        console.log("Estourou! O dealer perdeu.");
        const newScore = 21 - sum;
        if (isDouble) {
          setDealerScore(dealerScore + newScore * 2);
        } else {
          setDealerScore(dealerScore + newScore);
        }
        break;
      }

      // Sai do loop se o dealerValue for maior ou igual a 17
      // Hora de comparar a pontuação das duas mãos
      if (sum >= 17) {
        console.log("DEALER PAROU");
        if (sum <= 21) {
          if (sum > playerValue) {
            const newScore = sum - playerValue;
            if (isDouble) {
              setDealerScore(dealerScore + newScore * 2);
            } else {
              setDealerScore(dealerScore + newScore);
            }
          } else if (playerValue > sum) {
            const newScore = playerValue - sum;
            if (isDouble) {
              setPlayerScore(playerScore + newScore * 2);
            } else {
              setPlayerScore(playerScore + newScore);
            }
          } else if (sum == playerValue) {
            ("");
          }
        }

        setHandleNewGame(true);
        break;
      }
    }
  }

  async function doubleDownLogic() {
    setHitButtonDisabled(true);
    setDoubleButtonDisabled(true);
    setIsDouble(true);

    // Compra X cartas para o player
    let cards = await drawCards(deckID, "1");
    setDrawnCards(cards);
    console.log("Cartas compradas para o jogador: ", cards);

    // Cria a mão do jogador
    await createPile(deckID, "playerHand", cards);

    // popula a mão do jogador com as cartas compradas
    const playerCards = await listGame(deckID, "playerHand");
    console.log("PLAYERCARDS: ", playerCards);
    setPlayerHand(playerCards);
  }

  async function newGame() {
    await deckReturn(deckID, "playerHand", "dealerHand");
    setDealerHand([]);
    setPlayerHand([]);
    setHitButtonDisabled(false);
    setStandButtonDisabled(false);
    setDoubleButtonDisabled(false);
    setIsDouble(false);

    async function fetchNewGame() {
      // Embaralha o deck
      await reShuffleDeck(deckID);

      // Compra X cartas para o player
      let cards = await drawCards(deckID, "2");
      setDrawnCards(cards);
      console.log("Cartas compradas para o jogador: ", cards);

      // Cria a mão do jogador
      await createPile(deckID, "playerHand", cards);

      // popula a mão do jogador com as cartas compradas
      const playerCards = await listGame(deckID, "playerHand");
      console.log("PLAYERCARDS: ", playerCards);
      setPlayerHand(playerCards);

      // Compra X cartas para o dealer
      cards = await drawCards(deckID, "1");
      setDrawnCards(cards);
      console.log("Cartas compradas para o dealer: ", cards);

      // Cria a mão do dealer
      await createPile(deckID, "dealerHand", cards);

      // popula a mão do dealer com as cartas compradas
      const dealerCards = await listGame(deckID, "dealerHand");
      console.log("DEALERHAND: ", dealerCards);
      setDealerHand(dealerCards);
    }

    setHandleNewGame(false);
    fetchNewGame();
  }

  return (
    <div>
      {playerValue > 21 ? (
        <MidContainer>
          Você perdeu{" "}
          {isDouble
            ? (playerValue - 21) * 2 + ` (${playerValue - 21} x 2)`
            : playerValue - 21}{" "}
          pontos
          <Button
            onClick={() => {
              newGame();
            }}
          >
            Nova Rodada
          </Button>
        </MidContainer>
      ) : dealerValue > 21 ? (
        <MidContainer>
          Dealer perdeu{" "}
          {isDouble
            ? (dealerValue - 21) * 2 + ` (${dealerValue - 21} x 2)`
            : dealerValue - 21}{" "}
          pontos
          <Button
            onClick={() => {
              newGame();
            }}
          >
            Nova Rodada
          </Button>
        </MidContainer>
      ) : HandleNewGame ? (
        <MidContainer>
          {dealerValue > playerValue
            ? `Dealer venceu com uma diferença de ${
                dealerValue - playerValue
              }, ${
                isDouble
                  ? `ganhando ${(dealerValue - playerValue) * 2} pontos (${
                      dealerValue - playerValue
                    } x 2)`
                  : `ganhando ${dealerValue - playerValue} pontos`
              }`
            : playerValue > dealerValue
              ? `Você venceu com uma diferença de ${
                  playerValue - dealerValue
                }, ${
                  isDouble
                    ? `ganhando ${(playerValue - dealerValue) * 2} pontos (${
                        playerValue - dealerValue
                      } x 2)`
                    : `ganhando ${playerValue - dealerValue} pontos`
                }`
              : "Empate"}
          <Button
            onClick={() => {
              newGame();
            }}
          >
            Nova Rodada
          </Button>
        </MidContainer>
      ) : (
        <>
          <Button
            style={{
              opacity: hitButtonDisabled ? 0.5 : 1,
              cursor: hitButtonDisabled ? "default" : "pointer",
            }}
            onClick={() => hitLogic()}
            disabled={hitButtonDisabled}
          >
            Hit
          </Button>
          <Button
            style={{
              opacity: standButtonDisabled ? 0.5 : 1,
              cursor: standButtonDisabled ? "default" : "pointer",
            }}
            onClick={() => standLogic()}
            disabled={standButtonDisabled}
          >
            Stand
          </Button>
          <Button
            style={{
              opacity: doubleButtonDisabled ? 0.5 : 1,
              cursor: doubleButtonDisabled ? "default" : "pointer",
            }}
            onClick={() => doubleDownLogic()}
            disabled={doubleButtonDisabled}
          >
            Double Down
          </Button>
        </>
      )}
    </div>
  );
}

const MidContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 10px;
`;
