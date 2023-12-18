'use client'

import { createNewDeck } from '@/services/services';
import React, { SetStateAction, useEffect, useState } from 'react'
import { CardImage } from '../styledComponents/CardStyled';

interface Props {
  deckID: string
  setDeckID: React.Dispatch<SetStateAction<string>>;
}

export default function DrawPile({ deckID, setDeckID }: Props) {

  const fetchNewDeck = async () => {
    try {
      const id = await createNewDeck();
      setDeckID(id);
      console.log('Novo Baralho Criado| ID:', deckID);
    } catch (error) {
      console.error('Erro ao criar novo baralho:', error);
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
