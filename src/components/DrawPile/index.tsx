'use client'

import { createNewDeck, reShuffleDeck, drawCards, createPile, listGame } from '@/services/services';
import React, { SetStateAction } from 'react'
import { CardImage } from '../styledComponents/CardStyled';
import { Cards } from '@/types/types';

interface Props {
  deckID: string
  setDeckID: React.Dispatch<SetStateAction<string>>

  setDrawnCards: React.Dispatch<SetStateAction<string[]>>

  setPlayerHand: React.Dispatch<SetStateAction<Cards[]>>
}

export default function DrawPile({
  deckID,
  setDeckID,

  setDrawnCards,

  setPlayerHand
}: Props) {

  const fetchNewDeck = async () => {
    try {
      const id = await createNewDeck();
      setDeckID(id);
      console.log('Novo Baralho Criado| ID:', id);

      await reShuffleDeck(id)

      const cards = await drawCards(id, '2')
      setDrawnCards(cards)
      console.log('Cartas compradas: ', cards)

      await createPile(id, 'playerHand', cards)

      const playerCards = await listGame(id, 'playerHand')
      console.log('PLAYERCARDS: ', playerCards)
      setPlayerHand(playerCards)

    } catch (error) {
      console.error('Erro', error);
    }
  };

  return (
    <>
      {deckID != '' ? (
        <CardImage src='https://deckofcardsapi.com/static/img/back.png' />
      ) : (
        <button onClick={() => fetchNewDeck()}>Criar Baralho</button>
      )}
    </>
  )
}
