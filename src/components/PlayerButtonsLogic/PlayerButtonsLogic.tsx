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
}: Props) {
  const [hitButtonDisabled, setHitButtonDisabled] = useState(false);

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

    while (dealerValue < 17) {
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

      // Ajuste para As
      if (sum > 21) {
        const aceIndex = dealerCards.findIndex(
          (card: any) => card.value === "ACE",
        );
        if (aceIndex !== -1) {
          dealerCards[aceIndex].value = "1";
          sum -= 10;
        }
      }

      setDealerValue(sum);

      // Sai do loop se o dealerValue for maior ou igual a 17
      if (sum >= 17) {
        console.log("DEALER PAROU");
        break;
      }
    }
  }

  function splitLogic() {}

  async function newGame() {
    await deckReturn(deckID, "playerHand", "dealerHand");
    setDealerHand([]);
    setPlayerHand([]);
    setHitButtonDisabled(false);

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

    fetchNewGame();
  }

  return (
    <div>
      {playerValue > 21 ? (
        <>
          VOCÊ PERDEU
          <Button
            onClick={() => {
              newGame();
            }}
          >
            Nova Partida
          </Button>
        </>
      ) : dealerValue > 21 ? (
        <>
          DEALER PERDEU
          <Button
            onClick={() => {
              newGame();
            }}
          >
            Nova Partida
          </Button>
        </>
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
              opacity: hitButtonDisabled ? 0.5 : 1,
              cursor: hitButtonDisabled ? "default" : "pointer",
            }}
            onClick={() => standLogic()}
            disabled={hitButtonDisabled}
          >
            Stand
          </Button>
          <Button
            style={{
              opacity: hitButtonDisabled ? 0.5 : 1,
              cursor: hitButtonDisabled ? "default" : "pointer",
            }}
            onClick={() => splitLogic()}
            disabled={hitButtonDisabled}
          >
            Split
          </Button>
        </>
      )}
    </div>
  );
}
