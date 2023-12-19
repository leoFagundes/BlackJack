"use client";

import {
  createNewDeck,
  reShuffleDeck,
  drawCards,
  createPile,
  listGame,
} from "@/services/services";
import React, { SetStateAction, useEffect, useState } from "react";
import { CardImage } from "../styledComponents/CardStyled";
import { Cards } from "@/types/types";
import { Button } from "../styledComponents/ButtonStyled";
import { LabelContainer } from "../styledComponents/LabelStyled";
import { styled } from "styled-components";

interface Props {
  deckID: string;
  setDeckID: React.Dispatch<SetStateAction<string>>;
  setDrawnCards: React.Dispatch<SetStateAction<string[]>>;
  setPlayerHand: React.Dispatch<SetStateAction<Cards[]>>;
  setDealerHand: React.Dispatch<SetStateAction<Cards[]>>;
}

export default function DrawPile({
  deckID,
  setDeckID,
  setDrawnCards,
  setPlayerHand,
  setDealerHand,
}: Props) {
  const [deckCount, setDeckCount] = useState(0);

  const fetchNewDeck = async () => {
    try {
      // Cria um novo deck
      const id = await createNewDeck();
      setDeckID(id);
      console.log("Novo Baralho Criado| ID:", id);

      // Embaralha o deck
      await reShuffleDeck(id);

      // Compra X cartas para o player
      let cards = await drawCards(id, "2");
      setDrawnCards(cards);
      console.log("Cartas compradas para o jogador: ", cards);

      // Cria a mão do jogador
      await createPile(id, "playerHand", cards);

      // popula a mão do jogador com as cartas compradas
      const playerCards = await listGame(id, "playerHand");
      console.log("PLAYERCARDS: ", playerCards);
      setPlayerHand(playerCards);

      // Compra X cartas para o dealer
      cards = await drawCards(id, "1");
      setDrawnCards(cards);
      console.log("Cartas compradas para o dealer: ", cards);

      // Cria a mão do jogador
      await createPile(id, "dealerHand", cards);

      // popula a mão do jogador com as cartas compradas
      const dealerCards = await listGame(id, "dealerHand");
      console.log("DEALERHAND: ", dealerCards);
      setDealerHand(dealerCards);
      dealerCards;
    } catch (error) {
      console.error("Erro", error);
    }
  };

  useEffect(() => {
    const fetchSuffle = async () => {
      try {
        const response = await reShuffleDeck(deckID);
        console.log("Embaralhando deck", response);
        setDeckCount(response.remaining);
      } catch (error) {
        console.warn("Não foi possível embaralhar o deck");
      }
    };

    fetchSuffle();
  });

  return (
    <>
      {deckID != "" ? (
        <DeckDiv>
          <LabelContainer>Cartas restantes: {deckCount}</LabelContainer>
          <CardImage src="https://deckofcardsapi.com/static/img/back.png" />
        </DeckDiv>
      ) : (
        <Button onClick={() => fetchNewDeck()}>Criar Baralho</Button>
      )}
    </>
  );
}

const DeckDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 15px;
`;
