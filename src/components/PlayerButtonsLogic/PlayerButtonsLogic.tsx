import React, { SetStateAction } from "react";
import { Button } from "../styledComponents/ButtonStyled";
import { createPile, drawCards, listGame } from "@/services/services";
import { Cards } from "@/types/types";

interface Props {
  deckID: string;
  setDrawnCards: React.Dispatch<SetStateAction<string[]>>;
  setPlayerHand: React.Dispatch<SetStateAction<Cards[]>>;
}

export default function PlayerButtonsLogic({
  deckID,
  setDrawnCards,
  setPlayerHand,
}: Props) {
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

  function standLogic() {}

  function splitLogic() {}
  return (
    <div>
      <Button onClick={() => hitLogic()}>Hit</Button>
      <Button onClick={() => standLogic()}>Stand</Button>
      <Button onClick={() => splitLogic()}>Split</Button>
    </div>
  );
}
